# Contributions & Workflow

This document outlines the tools and workflows for the Veit Helmer project, specifically focusing on the AI-assisted Project Management integration using Vibe Kanban.

## Project Management (Vibe Kanban)

We use [Vibe Kanban](https://github.com/Start-Vibe/vibe-kanban) as our AI-powered project management tool. It integrates directly with VS Code via MCP (Model Context Protocol).

### Installation & Prerequisites

Ensure you have Node.js and PNPM installed.
The project uses `vibe-kanban` via `pnpm dlx`, so no global installation is strictly necessary, but `pnpm install` in the root directory will ensure dependencies in `package.json` are respected if we add any.

### Managing the Server

We have provided convenient scripts to manage the local Vibe Kanban server. This server provides the web dashboard for task management.

> **Note:** The VS Code integration (MCP) is configured in `.vscode/settings.json` and runs automatically when you open this workspace. The scripts below are primarily for running the standalone Dashboard or resetting the services.

#### 1. Check Status
To check if the Vibe Kanban server (and MCP integration) is running:
```bash
pnpm run kanban:check
```
*Or run directly:* `./scripts/check-status.sh`

#### 2. Start Services
To start the Vibe Kanban server in the background:
```bash
pnpm run kanban:start
```
*Or run directly:* `./scripts/start-services.sh`

This command will:
- Check if it's already running.
- Start the server using `nohup`.
- Log output to `vibe-kanban.log`.

#### 3. Stop Services
To stop all running Vibe Kanban instances:
```bash
pnpm run kanban:stop
```
*Or run directly:* `./scripts/stop-services.sh`

### Gemini Integration

Vibe Kanban uses Gemini for its intelligence.
Ensure you have your API key configured if you are running the server manually or if prompted by the tool.

- **Environment Variable:** `GEMINI_API_KEY`

### Script Reference

| PNPM Command | Script Path | Description |
|---|---|---|
| `pnpm run kanban:start` | `./scripts/start-services.sh` | Starts the server in background. |
| `pnpm run kanban:stop` | `./scripts/stop-services.sh` | Kills all vibe-kanban processes. |
| `pnpm run kanban:check` | `./scripts/check-status.sh` | Reports status of port and processes. |

## Development

- **Legacy Site:** Located in `legacy/`.
- **New Content:** Drafts in `new-movies/`.
- **Project Specs:** See `project-management/`.
