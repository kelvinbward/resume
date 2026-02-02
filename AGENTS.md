# 🧠 Service: Resume

## 📋 Service Role
Full-stack application (Node.js/PostgreSQL) serving the professional portfolio.

## 📡 Service Topology
| Context | Hostname | Port | Visibility |
| :--- | :--- | :--- | :--- |
| **Cluster (Frontend)** | `resume-frontend-1` | `80` | Public (Gateway routed) |
| **Cluster (Backend)** | `resume-backend-1` | `3000` | Internal |
| **Cluster (DB)** | `resume-db-1` | `5432` | Private |
| **Standalone** | `localhost` | `8080` (Web) / `3000` (API) | Public (Dev Mode) |

## 🚀 Execution Modes
- **Cluster**: `docker compose up` (Managed by `pi-cluster-configs`).
- **Standalone**: `docker compose -f docker-compose.standalone.yml up` (Includes local DB).

## 🔄 Handoff Protocol
1.  **Session Log**: Create entry in `pi-cluster-configs/logs/sessions/`.
2.  **State Sync**: Update `pi-cluster-configs/STATE.md` if dependencies change.
3.  **Cleanup**: Run `../kelvinbward/scripts/git_cleanup.sh` before new tasks.

## 🤝 Collaborative Workflow
- **Branching**: `feature/`, `fix/`, `infra/`.
- **Review**: Generate Direct Link for User PR creation.
- **Secrets**: NEVER commit. Use `secrets.env` template.
