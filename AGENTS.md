# 🧠 Project: resume (Public)

## 📋 Role
Full-stack application. Depends on `pi-cluster-configs` for DB and Gateway routing.

## 🔗 Dependencies
- **Upstream**: `pi-cluster-configs` (Database, Network).
- **Downstream**: None.

## 🌳 Relationship: System Root
This project is a **Service Node** in the `kelvinbward` Polyrepo system.
- **Root**: `../kelvinbward/AGENTS.md` (Defines global port/network rules)
- **Infrastructure**: managed by `../pi-cluster-configs` (Provides DB & Gateway)

## 🐳 Docker Modes
- **Cluster Mode (Default)**: `docker-compose.yml` (No exposed ports, `web_gateway` network). Relies on shared infrastructure.
- **Standalone Mode (Dev)**: `docker-compose.standalone.yml` (Full stack w/ local DB). Used for isolated dev.

## 🛠 Local Configuration
- **Ports**:
    - Frontend: `3000` (Standalone)
    - Backend: `3001` (Standalone)
- **Commands**:
    - `docker-compose -f docker-compose.standalone.yml up`

## 🔄 Protocol
1.  Update this file if app config changes.
2.  Update Root `AGENTS.md` if dependencies change.
3.  **Auto-Deployment**: This repository is configured to automatically build and push its production assets to the `kelvinbward` Professional Hub on every push to `main`. Ensure `API_TOKEN_GITHUB` secret is active.
