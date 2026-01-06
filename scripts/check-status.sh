#!/bin/bash

# Define paths
PORT_FILE=$(find /var/folders -name "vibe-kanban.port" 2>/dev/null | head -n 1)

echo "--- Vibe Kanban Service Check ---"

# Load .env if present
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
fi

# 1. Check Main Server (via Port)
DASHBOARD_STATUS="🔴 DOWN"
if [ -f "$PORT_FILE" ]; then
    PORT=$(cat "$PORT_FILE")
    if lsof -i :$PORT > /dev/null; then
        DASHBOARD_STATUS="🟢 RUNNING (Port: $PORT)"
    else
        # Stale file check
        echo "⚠️  Port file exists ($PORT) but port is closed."
    fi
fi
echo "$DASHBOARD_STATUS - Vibe Kanban Dashboard"

# 2. Check MCP Server (Managed by VS Code)
MCP_STATUS="🔴 NOT RUNNING"

# Check for the MCP process (started by VS Code via mcp.json)
if pgrep -f "vibe-kanban.*--mcp" > /dev/null; then
    MCP_STATUS="🟢 RUNNING"
elif ps -ef | grep "vibe-kanban" | grep "\-\-mcp" | grep -v grep > /dev/null; then
    MCP_STATUS="🟢 RUNNING"
fi
echo "$MCP_STATUS - Vibe Kanban MCP (VS Code managed)"

# 3. Check Gemini Access
echo ""
echo "--- Prerequisites ---"

# Check for API Key env var (common method)
if [ -n "$GEMINI_API_KEY" ]; then
    echo "✅ GEMINI_API_KEY is active."
else
    echo "❌ GEMINI_API_KEY is missing."
fi

# Check for CLI
if command -v gemini &> /dev/null; then
    echo "✅ 'gemini' CLI found."
else
    echo "⚠️  'gemini' CLI not found (Optional)."
fi
