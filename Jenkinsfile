pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20' // Configured in Jenkins Global Tool Configuration
    }

    environment {
        APP_NAME     = 'expense-tracker'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
    }

    options {
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit test suite...'
                sh 'npm run test'
            }
        }

        stage('Build Production Bundle') {
            steps {
                echo 'Building Vite production assets...'
                sh 'npm run build'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                echo 'Archiving dist output directory...'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: false
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker container image: ${DOCKER_IMAGE}"
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs deleteDirs: true, notFailBuild: true
        }
        success {
            echo "Pipeline completed successfully for build #${BUILD_NUMBER}!"
        }
        failure {
            echo "Pipeline failed for build #${BUILD_NUMBER}. Please check stage logs."
        }
    }
}
