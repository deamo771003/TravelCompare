pipeline {
    agent any
    tools {
        docker 'Docker'
    }

    stages {
        stage('Build docker compose') {
            steps {
                sh 'docker-compose up -d'
                sh 'sleep 5'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed.'
        }
    }
}
