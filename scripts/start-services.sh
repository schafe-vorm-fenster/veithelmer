#!/bin/bash

# --- 0. Helper Functions ---
# Extracts the port from the known temp file location
get_port() {
    find /var/folders -name "vibe-kanban.port" 2>/dev/null | head -n 1
}

check_mcp_running() {
    if pgrep -f "vibe-kanban.*--mcp" > /dev/null; then return 0; fi
    if ps -ef | grep "vibe-kanban" | grep "\-\-mcp" | grep -v grep > /dev/null; then return 0; fi
    return 1
}

start_dashboard() {
    echo "🚀 Starting Vibe Kanban Dashboard..."
    nohup pnpm dlx vibe-kanban@latest > vibe-kanban.log 2>&1 &
    PID=$!
    
    echo "⏳ Waiting for service to initialize..."
    # Reuse loop logic
    MAX_RETRIES=10
    COUNT=0
    
    while [ $COUNT -lt $MAX_RETRIES ]; do
        sleep 2
        PORT_FILE=$(get_port)
        if [ -n "$PORT_FILE" ] && [ -f "$PORT_FILE" ]; then
             break
        fi
        echo "   ... waiting for port file ($((COUNT+1))/$MAX_RETRIES)"
        COUNT=$((COUNT+1))
    done
}

# --- 1. Environment ---
if [ -f ".env" ]; then
    echo "Loading .env variables..."
    export $(grep -v '^#' .env | xargs)
fi

echo "--- Smart Service Manager ---"

# --- 2. Dashboard Health Logic ---
DASHBOARD_PIDS=$(pgrep -f "vibe-kanban" | grep -v "$(pgrep -f 'vibe-kanban.*--mcp')")

if [ -n "$DASHBOARD_PIDS" ]; then
    echo "🔍 Dashboard process found."
    
    PORT_FILE=$(get_port)
    if [ -f "$PORT_FILE" ]; then
        PORT=$(cat "$PORT_FILE")
        # Optional: Check if port is actually listening using lsof or curl
        if lsof -i :$PORT > /dev/null; then
             echo "✅ Dashboard is already RUNNING on port $PORT."
             NEEDS_START=false
        else
             echo "⚠️  Process exists but port $PORT seems closed. Unhealthy state."
             echo "🔄 Restarting Service..."
             
             # Kill just the dashboard pids
             for pid in $DASHBOARD_PIDS; do kill $pid 2>/dev/null; done
             sleep 1
             NEEDS_START=true
        fi
    else
        echo "⚠️  Process exists but no port file found. Stuck?"
        echo "🔄 Restarting Service..."
        for pid in $DASHBOARD_PIDS; do kill $pid 2>/dev/null; done
        sleep 1
        NEEDS_START=true
    fi
else
    echo "ℹ️  Dashboard is NOT running."
    NEEDS_START=true
fi

# --- 3. Start if Needed ---
if [ "$NEEDS_START" = true ]; then
    start_dashboard
fi

# --- 4. Final Status Report ---

echo ""
echo "--- Final Status Check ---"
./scripts/check-status.sh

# --- 5. MCP Info ---
echo ""
if ! check_mcp_running; then
    echo "ℹ️  MCP Server is managed by VS Code (not this script)."
    echo "   To start: Cmd+Shift+P → 'MCP: List Servers' → Start vibe_kanban"
else
    echo "✅ MCP Server is RUNNING (Managed by VS Code)."
fi
