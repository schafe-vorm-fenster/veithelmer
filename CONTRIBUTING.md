# Contributions & Workflow

This document outlines the tools and workflows for the Veit Helmer project, specifically focusing on the AI-assisted Project Management integration using Vibe Kanban.

## Project Management (Vibe Kanban)

We use [Vibe Kanban](https://github.com/BloopAI/vibe-kanban) as our AI-powered project management tool. It integrates with VS Code via MCP (Model Context Protocol) for GitHub Copilot.

### Architecture

The setup consists of two components:

1. **Dashboard** (Web UI) - Started via terminal scripts, runs in background
2. **MCP Server** (VS Code Integration) - Managed by VS Code via `.vscode/mcp.json`

### Prerequisites

- Node.js and PNPM installed
- VS Code Insiders (or VS Code 1.102+) with GitHub Copilot
- `GEMINI_API_KEY` in `.env` file (for Vibe Kanban AI features)

### Quick Start

```bash
# 1. Start the Dashboard
pnpm kanban:start

# 2. Start MCP in VS Code
#    Cmd+Shift+P → "MCP: List Servers" → Click "vibe_kanban" → Start
```

### Managing Services

#### Dashboard (Terminal Scripts)

| Command | Description |
|---------|-------------|
| `pnpm kanban:start` | Start the dashboard in background |
| `pnpm kanban:kill` | Stop all Vibe Kanban processes |
| `pnpm kanban:restart` | Restart the dashboard |
| `pnpm kanban:check` | Check status of all services |

#### MCP Server (VS Code)

The MCP server is configured in `.vscode/mcp.json` and managed by VS Code:

- **Start**: `Cmd+Shift+P` → `MCP: List Servers` → Click `vibe_kanban`
- **Stop**: Same menu, click to stop
- **Restart**: `Cmd+Shift+P` → `MCP: List Servers` → Restart option

> **Note**: The MCP server requires the Dashboard to be running first.

### Copilot Integration

Once both services are running, you can use Vibe Kanban tools in GitHub Copilot Chat:

- `list_projects` - List all projects
- `list_tasks` - List tasks in a project  
- `create_task` - Create a new task
- `update_task` - Update task status
- `get_task` - Get task details

### Troubleshooting

**MCP shows "Stopped" after VS Code reload:**
- This is normal. VS Code doesn't auto-start MCP servers.
- Manually start via `MCP: List Servers` command.

**Dashboard not responding:**
```bash
pnpm kanban:restart
```

**Check overall status:**
```bash
pnpm kanban:check
```

## Development

- **Legacy Site:** Located in `legacy/`
- **New Content:** Drafts in `new-movies/`
- **Project Specs:** See `project-management/`
