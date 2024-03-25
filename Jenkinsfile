pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Network Test') {
            steps {
                script {
                    def output = sh script: 'ping -c 4 google.com', returnStdout: true
                    println(output)
                }
            }
        }

        stage('Build docker compose') {
            steps {
                sh 'docker-compose up --build -d --wait'
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
        always {
            sh 'docker-compose down -v'
            sh 'docker rmi $(docker images -q) -f'
            echo 'Docker compose down executed.'
        }
    }
}
