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

### Prerequisites
- Docker & Docker Compose

### Getting Started
1. **Clone the repository**:
   ```bash
   git clone https://github.com/kelvinbward/resume.git
   cd resume
   ```

2. **Create Environment File**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. **Start the Application**:
   ```bash
   docker-compose up -d --build
   ```
   This will start:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000 (Internal)
   - Database: Port 5432

4. **Access the App**:
   Open [http://localhost:80](http://localhost:80) to view the resume.

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