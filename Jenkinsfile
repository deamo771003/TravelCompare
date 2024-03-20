pipeline {
    agent any

    stages {
        stage('Build docker compose') {
            steps {
                sh 'sudo docker-compose up -d'
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
