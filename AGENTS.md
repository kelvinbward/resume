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
    - Frontend: `80` (Standalone)
    - Backend: `5000` (Standalone)
- **Commands**:
    - `docker-compose -f docker-compose.standalone.yml up`

## 🌳 Git Branching & Workflow
1.  **NEVER commit directly to `main`**. Main is protected and direct pushes are forbidden.
2.  **Infrastructure Gatekeeping**: All infrastructure changes (conf, docker, workflows) require a PR and manual approval from @kelvinbward.
3.  **Always create a feature branch** using the prefix `feature/`, `fix/`, or `infra/`.
4.  **Draft Pull Requests**: When starting a task, create a draft PR immediately to track progress.
5.  **Clean History**: Use `git commit --amend` for small fixes during development and `git rebase main` before final merge.
6.  **Post-Merge**: Delete the feature branch once it is merged into `main`.

## 🤝 Human Protocol
*Since "Require Approvals" is disabled to allow Solo-Maintainer merging, strict discipline is required.*
1.  **Process**:
    *   Create Feature Branch -> Push -> Open PR.
    *   **Self-Review**: Review the "Files changed" tab in the PR.
    *   **Merge**: Use "Squash and merge" or "Rebase and merge" to keep history clean.
2.  **Emergency Bypass**:
    *   Only acceptable for critical hotfixes when GitHub Actions are down.
    *   Requires manual admin override.



## 🔄 Protocol
1.  Update this file if app config changes.
2.  Update Root `AGENTS.md` if dependencies change.
3.  **Auto-Deployment**: This repository is configured to automatically build and push its production assets to the `kelvinbward` Professional Hub on every push to `main`. Ensure `API_TOKEN_GITHUB` secret is active.
