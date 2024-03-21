pipeline {
    agent any
    stages {
        stage('Build docker compose') {
            steps {
                sh 'docker-compose --version'
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
