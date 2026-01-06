#!/bin/bash

echo "--- Stopping Vibe Kanban Services ---"

# Loop through all vibe-kanban related processes
found_dashboard=false

for PID in $(pgrep -f "vibe-kanban"); do
    # Get the full command line for this PID
    # We use 'ps -p PID -o args=' formatted for mac/linux compatibility
    CMDLINE=$(ps -p $PID -o args=)
    
    if [[ "$CMDLINE" == *"--mcp"* ]]; then
        echo "ℹ️  Skipping PID $PID (MCP Server managed by VS Code)"
    else
        echo "🛑 Stopping Dashboard Service (PID $PID)..."
        kill $PID
        found_dashboard=true
    fi
done

if [ "$found_dashboard" = false ]; then
    echo "No Dashboard services found running."
fi

# Stop MCP processes as well if requested/found
MCPS=$(pgrep -f "vibe-kanban.*--mcp")
if [ -n "$MCPS" ]; then
    echo "🛑 Stopping MCP Servers (PIDs: $MCPS)..."
    kill $MCPS
    sleep 1
    # Force kill if needed
    pkill -9 -f "vibe-kanban.*--mcp"
    echo "✅ MCP Servers stopped."
fi

# Verify cleanup
sleep 2
for PID in $(pgrep -f "vibe-kanban"); do
    CMDLINE=$(ps -p $PID -o args=)
    echo "⚠️  Force killing stuck process $PID ($CMDLINE)..."
    kill -9 $PID
done
echo "✅ All services stopped."

