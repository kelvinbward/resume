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

## 🤝 Collaborative Workflow
**Role Definition**:
*   **User (@kelvinbward)**: Senior Engineer / Owner. Has `admin` rights. Merges PRs.
*   **Agent (AI)**: Junior Engineer. Has `write` access to branches but **NO** PR/Merge rights.

**Protocol**:
1.  **Agent Work**:
    *   Create branch using prefix: `feature/` (new capability), `fix/` (bug repair), or `infra/` (system/ops).
    *   Commit changes -> Push to origin.
    *   **STOP**. Do not attempt to create PR via CLI.
    *   Generate a `Direct Link` (via Walkthrough) for the User to create the PR.
2.  **User Review**:
    *   Click Link -> Review Diff -> Create PR.
    *   Wait for `Agent Gatekeeper` checks to pass.
    *   Merge (Squash/Rebase).
3.  **Agent Cleanup (Start of Next Task)**:
    *   **MANDATORY**: Before starting ANY new task:
        *   `git checkout main`
        *   `git pull origin main`
        *   `git branch -d feature/previous-task` (Clean up local workspace)



## 🔄 Protocol
1.  Update this file if app config changes.
2.  Update Root `AGENTS.md` if dependencies change.
3.  **Auto-Deployment**: This repository is configured to automatically build and push its production assets to the `kelvinbward` Professional Hub on every push to `main`. Ensure `API_TOKEN_GITHUB` secret is active.
