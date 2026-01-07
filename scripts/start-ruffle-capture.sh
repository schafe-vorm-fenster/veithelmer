#!/bin/bash
# Quick Start Script for Phase 3.2.3 Ruffle Screenshot Capture

echo "🎬 Phase 3.2.3: Ruffle Screenshot Capture - Quick Start"
echo "=========================================================="
echo ""

# Check if we're in the right directory
if [ ! -d "legacy/movie-websites" ]; then
    echo "❌ Error: Please run this script from the project root"
    exit 1
fi

echo "📁 Directory Structure:"
ls -la legacy/movie-websites/*/ruffle/ 2>/dev/null | grep "^d" | wc -l | xargs echo "   Ruffle directories created:"

echo ""
echo "🌐 Starting local server on http://localhost:8080"
echo ""
echo "   Access the test interface at:"
echo "   → http://localhost:8080/ruffle-test-interface.html"
echo ""
echo "   Or directly browse movies at:"
echo "   → http://localhost:8080/[movie-slug]/index.html"
echo ""
echo "📸 Screenshot Shortcuts:"
echo "   macOS:   Cmd+Shift+4 (then Space for window, or drag for region)"
echo "   Windows: Win+Shift+S"
echo "   Linux:   Usually Shift+PrtScn or app-specific"
echo ""
echo "📋 Capture Checklist:"
echo "   ✓ Landing screens"
echo "   ✓ Main navigation menus"
echo "   ✓ All clickable elements"
echo "   ✓ Hover states"
echo "   ✓ Sub-pages and sections"
echo "   ✓ Animation key frames"
echo "   ✓ Language variants (DE/EN)"
echo ""
echo "💾 Save screenshots to:"
echo "   legacy/movie-websites/[slug]/ruffle/"
echo ""
echo "📖 Full guide: PHASE_3.2.3_RUFFLE_CAPTURE_GUIDE.md"
echo ""
echo "🚀 Starting server..."
echo "   Press Ctrl+C to stop"
echo ""

npx serve legacy/movie-websites -p 8080
