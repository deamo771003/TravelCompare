pipeline {
    agent any

    stages {
        stage('Build docker compose') {
            steps {
                sh 'dnf update -y'
                sh 'dnf install docker -y'
                sh 'curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'sudo chmod +x /usr/local/bin/docker-compose'
                sh 'sudo systemctl start docker'
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
