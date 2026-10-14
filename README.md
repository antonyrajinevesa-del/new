# Expense Tracker (React + Vite + Jenkins Pipeline)

A modern, responsive Expense Tracker application built with React and Vite, matching clean dashboard aesthetics, containerized with Docker, and configured with a Jenkins CI/CD pipeline.

## Features
- **Summary Cards**: Track Total Expenses and Total Transactions in real time.
- **Add Expense Form**: Add expenses with title, amount in INR (₹), category, and date.
- **Categorization & Badges**: Clean emoji badges for Food, Travel, Shopping, Bills, and Other.
- **Search & Filter**: Search transactions by title and filter by category dropdown.
- **Pre-configured CI/CD**: Complete `Jenkinsfile` for automated checkout, dependency installation, unit testing, Vite bundling, artifact archiving, and Docker image build.
- **Production-Ready Docker**: Multi-stage Dockerfile serving optimized static assets through Nginx.

## Local Development

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Setup & Run
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm run test

# Build for production
npm run build
```

## Docker Deployment

```bash
# Build the Docker image
docker build -t expense-tracker:latest .

# Run the container
docker run -d -p 8080:80 --name expense-tracker-app expense-tracker:latest
```
Access the application at `http://localhost:8080`.

## Jenkins Pipeline Setup

1. In Jenkins, ensure the **NodeJS plugin** and **Docker Pipeline plugin** are installed.
2. Go to **Manage Jenkins** > **Tools** and configure a NodeJS installation named `NodeJS-20`.
3. Create a new **Pipeline** job and point it to your Git repository containing this project.
4. Set the script path to `Jenkinsfile`.
5. Run the build to watch Jenkins execute all stages from testing to Docker build!
