pipeline {
    agent any
    
    stages {
        stage('Build docker') {
            steps {
                sh 'docker-compose up -d app'
            }
        }

        stage('Test') {
            steps {
                sh 'docker images'
                script {
                    docker.image('tc3_app').inside {
                        sh 'npm run test'
                    }
                }
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
