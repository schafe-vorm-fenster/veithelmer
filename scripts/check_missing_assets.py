#!/usr/bin/env python3
import os
import re
from pathlib import Path
import glob

films_dir = Path("content/films")
missing_posters = []
missing_trailers = []
no_poster_defined = []
no_trailer_defined = []
trailers_exist_but_not_in_frontmatter = []
trailers_defined_and_exist = []

for film_dir in sorted(films_dir.iterdir()):
    if not film_dir.is_dir() or film_dir.name == "__pycache__":
        continue
    
    film_name = film_dir.name
    
    en_file = film_dir / "index_en.md"
    de_file = film_dir / "index_de.md"
    
    poster_en = None
    poster_de = None
    trailer_en = None
    trailer_de = None
    
    if en_file.exists():
        content = en_file.read_text()
        poster_match = re.search(r'^poster_image:\s*(.+)$', content, re.MULTILINE)
        trailer_match = re.search(r'^trailer_video:\s*(.+)$', content, re.MULTILINE)
        if poster_match:
            poster_en = poster_match.group(1).strip().strip('"').strip("'")
        if trailer_match:
            trailer_en = trailer_match.group(1).strip().strip('"').strip("'")
    
    if de_file.exists():
        content = de_file.read_text()
        poster_match = re.search(r'^poster_image:\s*(.+)$', content, re.MULTILINE)
        trailer_match = re.search(r'^trailer_video:\s*(.+)$', content, re.MULTILINE)
        if poster_match:
            poster_de = poster_match.group(1).strip().strip('"').strip("'")
        if trailer_match:
            trailer_de = trailer_match.group(1).strip().strip('"').strip("'")
    
    # Check if poster exists
    if poster_en or poster_de:
        poster_file = poster_en or poster_de
        if not (film_dir / poster_file).exists():
            missing_posters.append(f"{film_name}: {poster_file}")
    else:
        no_poster_defined.append(film_name)
    
    # Check for actual trailer files in the directory
    trailer_files = list(film_dir.glob("trailer.*"))
    trailer_files = [f for f in trailer_files if f.suffix in ['.mp4', '.webm', '.jpg', '.png']]
    has_actual_trailer = len(trailer_files) > 0
    
    # Check if trailer exists
    if trailer_en or trailer_de:
        trailer_file = trailer_en or trailer_de
        if not (film_dir / trailer_file).exists():
            missing_trailers.append(f"{film_name}: {trailer_file}")
        else:
            trailers_defined_and_exist.append(f"{film_name}: {trailer_file}")
    else:
        if has_actual_trailer:
            trailer_list = ", ".join([f.name for f in trailer_files])
            trailers_exist_but_not_in_frontmatter.append(f"{film_name}: {trailer_list}")
        else:
            no_trailer_defined.append(film_name)

print("=" * 60)
print("MISSING POSTER IMAGES (referenced but file not found)")
print("=" * 60)
if missing_posters:
    for item in missing_posters:
        print(f"❌ {item}")
else:
    print("✅ All referenced posters exist!")

print(f"\nTotal: {len(missing_posters)} missing posters")

print("\n" + "=" * 60)
print("MISSING TRAILERS (referenced but file not found)")
print("=" * 60)
if missing_trailers:
    for item in missing_trailers:
        print(f"❌ {item}")
else:
    print("✅ All referenced trailers exist!")

print(f"\nTotal: {len(missing_trailers)} missing trailers")

print("\n" + "=" * 60)
print("TRAILERS EXIST BUT NOT IN FRONTMATTER")
print("=" * 60)
if trailers_exist_but_not_in_frontmatter:
    for item in trailers_exist_but_not_in_frontmatter:
        print(f"⚠️  {item}")
else:
    print("✅ No orphaned trailer files!")

print(f"\nTotal: {len(trailers_exist_but_not_in_frontmatter)} films with trailers not in frontmatter")

print("\n" + "=" * 60)
print("TRAILERS PROPERLY DEFINED AND EXIST")
print("=" * 60)
if trailers_defined_and_exist:
    for item in trailers_defined_and_exist:
        print(f"✅ {item}")
else:
    print("No films have properly defined trailers")

print(f"\nTotal: {len(trailers_defined_and_exist)} films with working trailers")

print("\n" + "=" * 60)
print("FILMS WITH NO POSTER DEFINED IN FRONTMATTER")
print("=" * 60)
if no_poster_defined:
    for item in no_poster_defined:
        print(f"⚠️  {item}")
else:
    print("✅ All films have poster_image defined!")

print(f"\nTotal: {len(no_poster_defined)} films without poster field")

print("\n" + "=" * 60)
print("FILMS WITH NO TRAILER AT ALL")
print("=" * 60)
if no_trailer_defined:
    for item in no_trailer_defined:
        print(f"⚠️  {item}")
else:
    print("✅ All films have trailers!")

print(f"\nTotal: {len(no_trailer_defined)} films without any trailer")

