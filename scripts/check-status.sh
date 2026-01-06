#!/bin/bash

# Define paths
PORT_FILE=$(find /var/folders -name "vibe-kanban.port" 2>/dev/null | head -n 1)

echo "--- Vibe Kanban Service Check ---"

# 1. Check Main Server (via Port)
if [ -f "$PORT_FILE" ]; then
    PORT=$(cat "$PORT_FILE")
    if lsof -i :$PORT > /dev/null; then
        echo "✅ Vibe Kanban Server is RUNNING (Port: $PORT)"
    else
        echo "⚠️  Port file exists ($PORT), but process is NOT running."
    fi
else
    echo "❌ Vibe Kanban Server port file not found (Server likely STOPPED)"
fi

# 2. Check MCP Server
# The MCP server runs as a process invoked by pnpm dlx or npx. We grep for the process name.
if pgrep -f "vibe-kanban.*--mcp" > /dev/null; then
    echo "✅ Vibe Kanban MCP Server is RUNNING"
else
    echo "❌ Vibe Kanban MCP Server is STOPPED"
fi

# 3. Check Gemini Access
echo ""
echo "--- Gemini Access Check ---"

# Check for API Key env var (common method)
if [ -n "$GEMINI_API_KEY" ]; then
    echo "✅ GEMINI_API_KEY environment variable is SET."
else
    echo "⚠️  GEMINI_API_KEY environment variable is NOT SET."
fi

# Check for Google Cloud CLI (gcloud) or generic 'gemini' command if applicable
if command -v gemini &> /dev/null; then
    echo "✅ 'gemini' CLI command found at $(which gemini)"
else
    echo "ℹ️  'gemini' CLI command not found in PATH."
fi
