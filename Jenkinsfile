pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Build docker') {
            steps {
                sh 'docker-compose up -d app'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npx jest'
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
