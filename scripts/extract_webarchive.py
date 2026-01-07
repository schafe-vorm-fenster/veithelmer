#!/usr/bin/env python3
"""Extract Safari .webarchive into HTML + asset files.

Writes:
  - index.html (main resource)
  - assets/ (subresources)
  - index.rewritten.html (optional rewritten references)

Usage:
  python3 scripts/extract_webarchive.py \
    "legacy/movie-websites/the-bra/VOM LOKFÜHRER, DER DIE LIEBE SUCHTE....webarchive" \
    --out "legacy/movie-websites/the-bra/the-bra-webarchive-extracted"
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import plistlib


def _sha1_hex(data: bytes) -> str:
    return hashlib.sha1(data).hexdigest()


def _safe_filename(name: str) -> str:
    name = name.strip().replace("\\", "_").replace("/", "_")
    name = re.sub(r"[^A-Za-z0-9._-]+", "_", name)
    name = re.sub(r"_+", "_", name)
    return name or "resource"


def _guess_ext(mime: Optional[str]) -> str:
    if not mime:
        return ""
    mime = mime.lower().split(";")[0].strip()
    return {
        "text/html": ".html",
        "text/css": ".css",
        "text/javascript": ".js",
        "application/javascript": ".js",
        "application/json": ".json",
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/gif": ".gif",
        "image/svg+xml": ".svg",
        "font/woff": ".woff",
        "font/woff2": ".woff2",
        "application/font-woff": ".woff",
        "application/octet-stream": "",
    }.get(mime, "")


def _read_plist(path: Path) -> Dict[str, Any]:
    with path.open("rb") as f:
        return plistlib.load(f)


def _resource_bytes(res: Dict[str, Any]) -> bytes:
    data = res.get("WebResourceData")
    if isinstance(data, (bytes, bytearray)):
        return bytes(data)
    raise ValueError("WebResourceData missing or not bytes")


def _resource_url(res: Dict[str, Any]) -> Optional[str]:
    url = res.get("WebResourceURL")
    return url if isinstance(url, str) and url else None


def _resource_mime(res: Dict[str, Any]) -> Optional[str]:
    mime = res.get("WebResourceMIMEType")
    return mime if isinstance(mime, str) and mime else None


def _resource_suggested_name(res: Dict[str, Any]) -> Optional[str]:
    name = res.get("WebResourceSuggestedFilename")
    return name if isinstance(name, str) and name else None


def _write_bytes(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def _relative_asset_name(url: str) -> str:
    # Try to keep a bit of recognizability; fall back to hash.
    base = url.split("?")[0].split("#")[0]
    leaf = base.rstrip("/").split("/")[-1]
    return leaf or "resource"


def _is_data_url(url: Optional[str]) -> bool:
    return bool(url) and url.startswith("data:")


def _build_asset_filename(res: Dict[str, Any], data: bytes, used_names: set[str]) -> str:
    url = _resource_url(res)
    suggested = _resource_suggested_name(res)
    mime = _resource_mime(res)

    # Safari WebArchives may embed resources as data: URLs, which can be enormous.
    # Use a short hash-based name to avoid hitting filesystem filename limits.
    if _is_data_url(url):
        digest = _sha1_hex(data)[:16]
        # Try to infer mime from the data URL header if possible.
        header = (url or "").split(",", 1)[0]
        inferred_mime = None
        if ";" in header:
            inferred_mime = header[len("data:") :].split(";", 1)[0].strip() or None
        elif header.startswith("data:"):
            inferred_mime = header[len("data:") :].strip() or None
        ext = _guess_ext(inferred_mime or mime)
        candidate = f"data_{digest}{ext}"
        used_names.add(candidate)
        return candidate

    candidate = suggested or (_relative_asset_name(url) if url else "resource")
    candidate = _safe_filename(candidate)

    ext = os.path.splitext(candidate)[1]
    if not ext:
        ext = _guess_ext(mime)
        candidate = candidate + ext

    # Normalize common Safari-suggested font names like "*.woff2.html" back to a
    # real font extension so browsers reliably load them from disk.
    if candidate.endswith(".woff2.html"):
        candidate = candidate[: -len(".html")]
    elif candidate.endswith(".woff.html"):
        candidate = candidate[: -len(".html")]

    # Protect against path/filename limits on macOS.
    max_len = 120
    if len(candidate) > max_len:
        stem, ext2 = os.path.splitext(candidate)
        digest = _sha1_hex(data)[:10]
        keep = max(8, max_len - len(ext2) - len(digest) - 1)
        stem = stem[:keep]
        candidate = f"{stem}_{digest}{ext2}"

    # Ensure uniqueness.
    if candidate in used_names:
        digest = _sha1_hex(data)[:10]
        stem, ext2 = os.path.splitext(candidate)
        candidate = f"{stem}_{digest}{ext2}"

    used_names.add(candidate)
    return candidate


def _rewrite_html(html: str, url_to_local: Dict[str, str]) -> str:
    # Very conservative rewrite: replace exact URL strings with local relative paths.
    # This helps when the HTML references absolute URLs that are now extracted.
    for url, local in sorted(url_to_local.items(), key=lambda x: -len(x[0])):
        html = html.replace(url, local)
    return html


def _rewrite_offline_paths_in_html(html: str) -> str:
    # Handle common patterns from Veit Helmer microsites where assets were referenced
    # via a sibling folder (e.g. ../../../vom-lokfuehrer-der-die-liebe-suchte/assets/...).
    #
    # Goal: make the extracted snapshot openable directly via file:// by rewriting
    # everything into our flattened ./assets/ output folder.
    html = html.replace("../../../vom-lokfuehrer-der-die-liebe-suchte/assets/", "assets/")
    html = html.replace("../../vom-lokfuehrer-der-die-liebe-suchte/assets/", "assets/")
    html = html.replace("../vom-lokfuehrer-der-die-liebe-suchte/assets/", "assets/")

    # Flatten legacy /assets/{css,js,imgs,icons}/... -> ./assets/...
    html = html.replace("assets/css/", "assets/")
    html = html.replace("assets/js/", "assets/")
    html = html.replace("assets/imgs/", "assets/")
    html = html.replace("assets/icons/", "assets/")
    return html


def _rewrite_offline_paths_in_css(css: str) -> str:
    # The extractor writes CSS into ./assets/styles.css; rewrite relative url()s
    # that assumed a /assets/css/ directory.
    css = css.replace("../imgs/", "./")
    css = css.replace("../icons/", "./")
    css = css.replace("../fonts/Montserrat/", "./")

    # Some archives reference italic font files that may not be present as separate
    # subresources; map them to the closest available weights to avoid 404s.
    css = css.replace("Montserrat-MediumItalic.woff2.html", "Montserrat-Medium.woff2")
    css = css.replace("Montserrat-BoldItalic.woff2.html", "Montserrat-Bold.woff2")

    # Normalize any remaining font references to the new on-disk extensions.
    css = css.replace("Montserrat-Medium.woff2.html", "Montserrat-Medium.woff2")
    css = css.replace("Montserrat-Bold.woff2.html", "Montserrat-Bold.woff2")

    # Safari may preserve the original URL leaf name, while our filename sanitizer
    # rewrites characters like '@' to '_' when writing files.
    css = css.replace("logos@2x.png", "logos_2x.png")
    return css


def extract_webarchive(webarchive_path: Path, out_dir: Path) -> Tuple[Path, Path, int]:
    plist = _read_plist(webarchive_path)

    main = plist.get("WebMainResource")
    if not isinstance(main, dict):
        raise ValueError("Invalid .webarchive: missing WebMainResource")

    sub = plist.get("WebSubresources")
    subresources: List[Dict[str, Any]] = []
    if isinstance(sub, list):
        subresources = [r for r in sub if isinstance(r, dict)]

    out_dir.mkdir(parents=True, exist_ok=True)
    assets_dir = out_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    # Write main HTML
    main_bytes = _resource_bytes(main)
    main_mime = _resource_mime(main)

    # Decode HTML as UTF-8 best-effort; keep raw bytes too.
    index_path = out_dir / "index.html"
    _write_bytes(index_path, main_bytes)

    url_to_local: Dict[str, str] = {}
    used_names: set[str] = set()

    # Write subresources
    for res in subresources:
        data = _resource_bytes(res)
        filename = _build_asset_filename(res, data, used_names)

        mime = _resource_mime(res)
        if filename.endswith(".css") or (mime and mime.lower().startswith("text/css")):
            try:
                css_text = data.decode("utf-8")
            except UnicodeDecodeError:
                css_text = data.decode("latin-1", errors="replace")
            data = _rewrite_offline_paths_in_css(css_text).encode("utf-8")

        local_path = assets_dir / filename
        _write_bytes(local_path, data)

        url = _resource_url(res)
        if url and not _is_data_url(url):
            url_to_local[url] = f"assets/{filename}"

    # Optional rewrite of HTML for offline viewing.
    try:
        html_text = main_bytes.decode("utf-8")
    except UnicodeDecodeError:
        html_text = main_bytes.decode("latin-1", errors="replace")

    rewritten = _rewrite_html(html_text, url_to_local)
    rewritten = _rewrite_offline_paths_in_html(rewritten)
    rewritten_path = out_dir / "index.rewritten.html"
    rewritten_path.write_text(rewritten, encoding="utf-8")

    return index_path, rewritten_path, len(subresources)


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract Safari .webarchive into HTML + assets")
    parser.add_argument("webarchive", type=str, help="Path to .webarchive")
    parser.add_argument("--out", type=str, required=True, help="Output directory")
    args = parser.parse_args()

    webarchive_path = Path(args.webarchive)
    out_dir = Path(args.out)

    if not webarchive_path.exists():
        raise SystemExit(f"Input not found: {webarchive_path}")

    index_path, rewritten_path, count = extract_webarchive(webarchive_path, out_dir)
    print(f"Extracted {count} subresources")
    print(f"Main HTML: {index_path}")
    print(f"Rewritten HTML (recommended): {rewritten_path}")


if __name__ == "__main__":
    main()
