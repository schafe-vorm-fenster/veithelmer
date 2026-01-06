#!/bin/bash

echo "Starting Vibe Kanban Server..."

# Check if already running
if pgrep -f "vibe-kanban" > /dev/null; then
    echo "Service appears to be already running."
    exit 1
fi

# Run in background using nohup so it persists after terminal close
# Redirect output to a log file
nohup pnpm dlx vibe-kanban@latest > vibe-kanban.log 2>&1 &
PID=$!

echo "⏳ Waiting for service to initialize..."

# Retry loop for Port File (up to 30 seconds)
# Vibe Kanban might take a moment to write the port file
MAX_RETRIES=10
COUNT=0
PORT_FILE=""

while [ $COUNT -lt $MAX_RETRIES ]; do
    sleep 3
    PORT_FILE=$(find /var/folders -name "vibe-kanban.port" 2>/dev/null | head -n 1)
    if [ -n "$PORT_FILE" ]; then
        break
    fi
    echo "   ... waiting for port file ($((COUNT+1))/$MAX_RETRIES)"
    COUNT=$((COUNT+1))
done

echo ""
if [ -n "$PORT_FILE" ] && [ -f "$PORT_FILE" ]; then
    PORT=$(cat "$PORT_FILE")
    echo "✅ Vibe Kanban Dashboard started with PID $PID"
    echo "📄 Logs: vibe-kanban.log"
    echo "🔗 URL: http://localhost:$PORT"
else
    echo "✅ Vibe Kanban Dashboard process started (PID $PID)"
    echo "⚠️  Could not detect dynamic port file yet."
    echo "📄 Check vibe-kanban.log for details."
    echo "🔗 Try URL: http://localhost:3000"
fi

echo ""
# Start MCP Server in Background (Standalone Mode)
# This is useful if you want to use the MCP server with tools other than VS Code,
# or if VS Code is having trouble starting it.
echo "Starting Vibe Kanban MCP Server (Standalone)..."
nohup pnpm dlx vibe-kanban@latest --mcp > vibe-kanban-mcp.log 2>&1 &
MCP_PID=$!
echo "✅ MCP Server started with PID $MCP_PID"
echo "📄 MCP Logs: vibe-kanban-mcp.log"

echo ""
# Check Status
if pgrep -f "vibe-kanban.*--mcp" > /dev/null; then
    echo "✅ MCP Server is RUNNING."
    echo "💡 Note: This script started a standalone MCP server."
    echo "   If VS Code AI integration is still not working, try 'Developer: Reload Window'."
else
    echo "⚠️  MCP Server failed to start."
fi
