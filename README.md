# 🛡️ SafeZone — Code Quality and Security Pipeline for E-commerce Microservices

**Author:** Mouhamadou Diouf  
**Project Type:** DevSecOps Enhancement  
**Tools:** SonarQube, Docker, GitHub Actions, Jenkins, Git

---

## 🎯 Objectives

**SafeZone** is a DevOps enhancement project designed to improve **code quality** and **security** for an existing e-commerce microservices application. By integrating **SonarQube** into the development workflow, this project ensures that bad practices are identified and avoided early in the development lifecycle.

---

## 🧭 Key Features

- 🐳 **SonarQube setup via Docker**
- 🔍 **Static code analysis** for backend (Spring Boot) and frontend (Angular)
- 🔗 **GitHub integration** with automated scans on each push
- 🚦 **CI/CD integration** with Jenkins or GitHub Actions
- ❌ **Pipeline fails** on quality/security issues
- 🔄 **Continuous monitoring** through the SonarQube dashboard
- ✅ **Review & approval workflows** for team collaboration

---

## 📦 Instructions

### 1. 🐳 SonarQube Setup with Docker

Pull the SonarQube Docker image and run it on your local environment.
Hint: You can use the official SonarQube Docker image available on Docker Hub.

### 2. SonarQube Configuration**
Access the SonarQube web interface running on your local environment.
Configure SonarQube to work with your e-commerce microservices project's codebase.

### 3. GitHub Integration**
Integrate SonarQube with your GitHub repository.
Configure webhooks or GitHub Actions to trigger code analysis on every push to the repository.

### 4. Code Analysis**
Automate code analysis using SonarQube during the CI/CD pipeline.
Configure the pipeline to fail if code quality or security issues are detected by SonarQube.

### 5. Continuous Monitoring**
Ensure that SonarQube runs regularly to provide continuous monitoring of code quality and security.

### 6. Review and Approval Process**
Implement a code review and approval process to ensure that code quality improvements are reviewed and approved by team members.
