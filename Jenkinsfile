pipeline {
    agent any
    
    stages {
        stage('Build Docker Network') {
          steps {
            script {
                sh 'docker network create tc_network'
                sh 'docker network ls | grep tc_network'
            }
          }
        }
        stage('Build docker') {
            steps {
                sh 'docker build -t tc-image .'
                sh 'docker ps | grep tc-image'
            }
        }
        stage('Start App Container') {
            steps {
                sh 'docker run -it -d -p 3000:3000 --env-file /etc/jenkins/.env --name tc-container --network tc_network tc-image /bin/sh'
                sh 'docker ps | grep tc-container'
            }
        }
        stage('Test') {
            steps {
                sh 'docker ps'
                sh 'docker exec tc-container npm run test'
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
            sh 'docker stop tc-container || true'
            sh 'docker rm tc-container || true'
            sh 'docker rmi tc-image || true'
            sh 'docker network rm tc_network'
            sh 'docker image prune -f || true'
            sh 'docker volume prune -f || true'
            echo 'Docker compose down executed.'
        }
    }
}
