pipeline {
    agent any
    
    stages {
        stage('Build docker') {
            steps {
                sh 'docker-compose up --build -d app'
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
            echo 'Docker compose down executed.'
        }
    }
}
