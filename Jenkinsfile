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
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d app'
                sh 'docker-compose logs'
            }
        }
        stage('Test') {
            steps {
                sh 'docker ps'
                sh 'docker exec tc_app-1 npm run test'
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
            sh 'docker network rm tc_network'
            sh 'docker image prune -f || true'
            sh 'docker volume prune -f || true'
            echo 'Docker compose down executed.'
        }
    }
}
