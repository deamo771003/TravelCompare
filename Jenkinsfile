pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Network Test') {
            steps {
                sh 'apt-get update && apt-get install -y iputils-ping'
                script {
                    def output = sh script: 'ping -c 4 google.com', returnStdout: true
                    println(output)
                }
            }
        }

        stage('Build docker') {
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
