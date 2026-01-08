# Kelvin Ward - Resume Website

A modern, responsive resume website built with HTML, CSS, and JavaScript, now powered by a **full-stack containerized architecture**.

## 🚀 Live Site
[View Resume](https://kelvinbward.github.io/resume/) (Static Version)

## 🏗 Architecture
This project has been migrated from a static site to a dynamic application using Docker.
- **Frontend**: Nginx container serving static assets and proxying API requests.
- **Backend**: Node.js/Express REST API.
- **Database**: PostgreSQL 15.

## 🛠 Features
- **Dynamic Content**: Data is served via REST API from a PostgreSQL database.
- **CRUD Operations**: API supports Create, Read, Update operations.
- **Static Export**: Includes a utility to export DB content back to `resume.json` to maintain GitHub Pages compatibility.
- **Dockerized**: Fully containerized for consistent development and deployment.

## 📦 Local Development

### prerequisites
- Docker & Docker Compose

### 📦 Quick Start (Standalone Mode)
For visitors who want to run this project locally in full isolation (with its own database):

1. **Start the Standalone Stack**:
   ```bash
   docker-compose -f docker-compose.standalone.yml up -d --build
   ```
2. **Access the App**:
   - Frontend: [http://localhost:80](http://localhost:80)
   - API: [http://localhost:5000](http://localhost:5000)

### 🏗️ Polyrepo Development (Kelvin's Setup)
This repository is configured by default to run inside my personal **Polyrepo Infrastructure**. 
- It expects an external network named `web_gateway`.
- It expects a PostgreSQL instance named `resume-db-1` on that network.

To run in this mode:
```bash
docker-compose up -d --build
```
*(Note: Will fail if shared infrastructure is not running.)*

### Managing Data
- **View Data**: `GET http://localhost:80/api/resume`
- **Update Data**: Use Postman or curl to send `PUT` requests to `/api/resume/:id`
- **Export for Static Site**:
  To update the `frontend/resume.json` file for GitHub Pages deployment:
  ```bash
  curl http://localhost:80/api/resume/export
  ```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.