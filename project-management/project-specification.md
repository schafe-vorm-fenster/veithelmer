# **Project Specification**

## **1\. Project Overview**

The objective of this project is to preserve and modernize the digital archive of filmmaker Veit Helmer. This involves extracting data from legacy HTML and Macromedia Flash websites, researching and optimizing media assets, and rebuilding the entire presence using a modern, static-site architecture (11ty).

## **2\. Core Project Goals**

1. **Data Extraction:** Recover all text, metadata, and assets from the legacy directors-website and movie-websites folders.  
2. **Media Optimization:** Convert deprecated formats (FLV, SWF assets) to modern standards (MP4, SVG) and enrich the archive with missing content from external sources (YouTube/Web Research).  
3. **Modern Architecture:** Implement a high-performance, bilingual 11ty (Eleventy) website.  
4. **UI/UX Rebuild:** Recreate the "Flash-era" experience using modern HTML5/CSS3/JS, ensuring mobile responsiveness and SEO compatibility.

## **3\. Legacy Repository Audit**

The project is based on the following legacy structure, which must be fully cataloged:

* **legacy/directors-website**: The main portfolio.  
  * de/ & en/: Localized versions including Biography, Documentaries, Short Films, etc.  
  * img/ & styles/: Shared assets and Bootstrap-based CSS.  
* **legacy/movie-websites**: Standalone microsites.  
  * Including: *Absurdistan*, *Baikonur*, *Behind the Couch*, *Quatsch*, *The Bra*, *Tor zum Himmel*, *Tuvalu*, and *The Train Catcher*.  
* **new-movies/**: Initial Markdown notes for upcoming projects like *Akiko*, *Gondola*, and *Shanghai*.

## **4\. Web Archive Research & Visual Documentation**

To ensure the modern reconstruction remains faithful to the original creative vision, a dedicated research phase using the **Internet Archive (Wayback Machine)** is required for all Flash-based sites.

### **4.1 Visual Recovery Goals**

* **Screenshot Documentation:** Capture high-resolution screenshots of all primary navigation states, sub-pages, and unique UI elements that may no longer load correctly in local environments.  
* **Layout Mapping:** Document the exact positioning of elements, typography choices, and color palettes used in the original Flash "stage."  
* **Asset Context:** Identify how specific images and vector shapes (extracted via JPEXS) were originally composed and animated.

### **4.2 Research Workflow**

1. **URL Identification:** Map legacy domains (e.g., absurdistan-the-movie.com, baikonur-film.de) to their most active periods between 1999 and 2015\.  
2. **Snapshot Selection:** Locate snapshots with the highest file sizes (often indicating successful Flash asset capture).  
3. **Interaction Scripting:** Create "interaction maps" based on archived versions to define how menus unfolded or how transitions between movie clips were handled.  
4. **Missing Content Gap-Fill:** Use the archive to recover text or slogans that might be missing from the local source files but were visible to the public.

## **5\. Data Extraction & Content Strategy**

All content will be migrated to a **Markdown \+ Frontmatter** structure.

### **5.1 Film Data Schema**

Each film requires a .md file in both /de/ and /en/ with the following Frontmatter:

* **Fields**: Title, description, director, cast, release year, duration.  
* **Image Handling**: A film image matching the Markdown filename, linked in Frontmatter for teaser use.  
* **External Links**: Path or URL for films with dedicated microsites.

### **5.2 Static Page Extraction**

* Biography, Imprint, and Privacy Policy must be converted into bilingual Markdown files.  
* Biography photos must be stored and linked as structured assets.

### **5.3 Media Processing Workflow**

* Video Conversion: All .flv files must be converted to H.264 MP4 via FFmpeg:  
  ffmpeg \-i input.flv \-c:v libx264 \-crf 23 \-c:a aac output.mp4  
* **YouTube Integration**: Download linked videos and extract high-quality stills.  
* **Research Task**: Conduct web research for "New Movies" and entries with missing synopses or cast lists.

## **6\. Technical Stack (11ty Architecture)**

The site will be built using the **Eleventy Excellent** starter kit philosophy.

| Component | Technology | Details |
| :---- | :---- | :---- |
| **Generator** | Eleventy 3.1+ | JavaScript-based, ESM-native. |
| **Architecture** | Zero-Client-Side JS | Minimal JS payload for better performance. |
| **Styling** | Tailwind CSS v4 | Utility-first approach via PostCSS. |
| **Templating** | Nunjucks (.njk) | For logic and layouts. |
| **Build Hook** | eleventy.before | Integrates PostCSS/Tailwind builds. |
| **Animations** | GSAP | For rebuilding Flash-like fluid transitions. |
| **Deployment** | GitHub Pages | Automated via GitHub Actions. |

## **7\. Website Design & UI**

The design will feature a minimalist aesthetic: **Black background, White text.**

### **7.1 Homepage: "Streaming Service" Style**

* **Navigation**: Top menu with categories (Feature, Short, Commercial, Documentary) acting as anchor links.  
* **Categorized Sections**: Grouped under H2 headings.  
* **Teaser Grid**: Films displayed as tiles, sorted by release year (newest first).  
* **Tile Design**: Rounded corners, no borders. Includes film image, title, and year.  
* **Interactivity**: Hover effects (shadows/gradients) and discrete arrow icon buttons.  
* **Footer Content**: Biography and Shop links are placed at the bottom.

### **7.2 Detail Pages**

* **Content**: H1 Title, release year, full-width hero image, description.  
* **Data**: Definition list for cast and crew details.  
* **Links**: Prominent link to the dedicated movie microsite if applicable.

## **8\. Flash Reconstruction Plan**

Rebuilding legacy microsites (*Absurdistan*, *Tor zum Himmel*, etc.) is a priority.

### **8.1 Reverse Engineering Process**

1. **Decompilation**: Use **JPEXS Free Flash Decompiler** to export JPG/PNG assets and **SVG** vector shapes.  
2. **Logic Extraction**: Analyze ActionScript to understand menu and animation behaviors.  
3. **Emulation**: Use **Ruffle** during development to study the original interaction.

### **8.2 HTML/CSS Implementation**

* **Structure**: HTML5 Semantic markup.  
* **Layout**: CSS Grid or Flexbox to replicate star-fixed Flash positions responsively.  
* **Transitions**: GSAP for timeline-based animations.

## **9\. SEO, Performance & Localization**

* **Language Handling**: /de/ and /en/ structure with hreflang tags.  
* **Routing**: JS-based auto-redirect based on browser language (meta-refresh fallback to English).  
* **Image Optimization**: eleventy-img for responsive delivery (srcset).  
* **Performance**: 10px Base64-encoded "Blur-up" placeholders and lazy loading.  
* **GDPR**: Local WOFF2 font hosting (no external Google Fonts).  
* **Indexing**: robots.txt and dynamic sitemap.xml.