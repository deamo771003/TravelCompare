pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
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
