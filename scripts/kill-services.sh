#!/bin/bash

# Define Port File Pattern
PORT_FILE_PATTERN="vibe-kanban.port"

echo "--- Stopping Vibe Kanban Services ---"

# 1. Kill by Port (Most reliable for the Dashboard)
# Find the port file to know what port to kill
PORT_FILE=$(find /var/folders -name "$PORT_FILE_PATTERN" 2>/dev/null | head -n 1)

if [ -n "$PORT_FILE" ] && [ -f "$PORT_FILE" ]; then
    PORT=$(cat "$PORT_FILE")
    echo "🔍 Found Port File at $PORT_FILE (Port: $PORT)"
    
    # Find active processes on this port
    PORT_PIDS=$(lsof -t -i :$PORT 2>/dev/null)
    
    if [ -n "$PORT_PIDS" ]; then
        echo "🛑 Killing process on port $PORT (PIDs: $PORT_PIDS)..."
        kill -9 $PORT_PIDS 2>/dev/null
    fi
    
    # Remove the stale port file
    rm "$PORT_FILE"
    echo "🗑️  Removed port file."
fi

# 2. Kill by Name (Cleanup for MCP and detached processes)
echo "🔍 Scanning for remaining 'vibe-kanban' processes..."

# Kill Loop
pids_to_kill=""
# Add vibe-kanban processes
pids_to_kill="$pids_to_kill $(pgrep -f "vibe-kanban")"
# Add the wrapper script itself (if waiting)
pids_to_kill="$pids_to_kill $(pgrep -f "mcp-wrapper.sh")"

for PID in $pids_to_kill; do
    if ps -p $PID > /dev/null 2>&1; then
        CMDLINE=$(ps -p $PID -o args=)
        echo "🛑 Killing (PID $PID): $CMDLINE"
        kill -9 $PID 2>/dev/null
    fi
done

# 3. Final Verification
sleep 1
REMAINING=$(pgrep -f "vibe-kanban")
if [ -n "$REMAINING" ]; then
    echo "⚠️  Warning: Some processes are still running: $REMAINING"
else
    echo "🔴 All services stopped."
fi


