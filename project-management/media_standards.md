# Media Standards & Transformation Protocols

This document serves as the technical specification for all media processing within the Veit Helmer archive project. All agents and scripts must adhere to these standards to ensure consistency, compatibility, and quality.

## 1. Video Transformation Protocol

### Goal
Convert legacy Flash Video (`.flv`) and other deprecated formats to modern, web-optimized H.264 MP4.

### Specification
*   **Input Format:** `.flv`, `.swf` (embedded video), `.mov` (legacy codecs)
*   **Output Format:** `.mp4` (H.264 Video, AAC Audio)
*   **Container:** MP4
*   **Video Codec:** `libx264` (H.264)
*   **Audio Codec:** `aac`
*   **Quality/Compression:** CRF 23 (Visually lossless for web)

### Standard Command
The following FFmpeg command must be used for all video conversions:

```bash
ffmpeg -i input.flv -c:v libx264 -crf 23 -c:a aac trailer.mp4
```

### Explanation of Flags
*   `-i input.flv`: The input video file.
*   `-c:v libx264`: Sets the video codec to H.264 (x264 encoder), the web standard for compatibility.
*   `-crf 23`: Constant Rate Factor. Lower values are higher quality. 23 is the default and recommended balance for H.264.
*   `-c:a aac`: Sets the audio codec to AAC (Advanced Audio Coding), widely supported and efficient.
