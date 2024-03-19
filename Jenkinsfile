pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Install') {
                sh 'npm config delete proxy'
                sh 'npm install'
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
