# 🧠 Service: Resume Spoke

## 📋 Service Role
**Professional Data Source**.
- **Target Hub**: `kelvinbward`
- **Stack**: React (Frontend) + Node.js (Backend) + PostgreSQL.

## 📡 Service Topology
| Context | Hostname | Port | Visibility |
| :--- | :--- | :--- | :--- |
| **API** | `resume-backend-1` | `3000` | Internal |
| **Frontend** | `resume-frontend-1` | `80` | Internal |
| **DB** | `resume-db-1` | `5432` | Private |

## 🚀 Execution Modes
| Mode | Config | Command | Description |
| :--- | :--- | :--- | :--- |
| **Cluster** | `docker-compose.yml` | `docker compose up -d` | Prod. Connects to shared DB. |
| **Standalone** | `docker-compose.standalone.yml` | `docker compose -f ... up` | **Port 8080**. Isolated mock DB. |

## 🔄 Handoff Protocol
1.  **Migration**: Schema changes require `init.sql` update.
2.  **Workflow**: Push to `feature/` branch. Create PR to `main`.

## 🤝 Collaborative Workflow
- **Branching**: `feature/` (Resume data/UI).
