# ✅ Safe-Zone – Code Quality & Security Enhancement for E-commerce Microservices

MR-Jenk is a **CI/CD pipeline project** built with **Jenkins** to automate the **build**, **test**, and **deployment** process of an e-commerce platform based on microservices architecture.

---

## 📦 Project Overview

This project implements a complete DevOps pipeline using Jenkins, Docker, and modern testing tools. It is designed to streamline the software delivery lifecycle by automatically:

- Fetching source code from a Git repository (Gitea)
- Running backend and frontend tests
- Deploying microservices using Docker Compose
- Sending notifications on build success or failure

---

## 🛠️ Tools & Technologies

- **Jenkins** – Pipeline-as-Code, CI/CD engine
- **Docker & Docker Compose** – Containerization and orchestration
- **Angular** – Frontend application
- **Spring Boot** – Microservices (users, products, media)
- **MongoDB**, **Kafka**, **Eureka** – Supporting services
- **JUnit** – Backend testing
- **Ngrok** – Public URL for webhook testing
- **Email-ext plugin** – Notifications via email

---

## 🏗️ Architecture

```text
+-------------------+
| Git Repository    |   <-- Source code (Gitea)
+-------------------+
         |
         v
+-------------------+
| Jenkins Pipeline  |   <-- CI/CD Orchestrator
+-------------------+
    |      |      |
    |      |      +--> Test frontend
    |      +--> Test microservices with JUnit
    +--> Deploy services using Docker Compose



```

## 🚀 Pipeline Stages

```
```
1. ✅ **Start Required Services**  
   Starts MongoDB, Kafka, Eureka, and Gateway using `docker-compose.dep.yml` and `docker-compose.services.yml`.

2. 🔍 **Testing**  
   - **Frontend**: `npm install` & unit tests using `ChromeHeadlessCI`  
   - **Microservices**: Executes JUnit tests for users, products, and media APIs

3. 🧱 **Deployment**  
   - Builds and redeploys all services (`users`, `products`, `media`, `front-end`) using Docker Compose  
   - Runs only if tests are successful

4. 📬 **Notifications**  
   - Sends email notification using `emailext` on success or failure  
   - Email includes build status, job name, and a link to the Jenkins console output
   
   ```