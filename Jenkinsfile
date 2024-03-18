pipeline {
    agent any
    tools {
        nodejs 'node-12.18.3'
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'All pass'
        }
        failure {
            echo 'Test fale'
        }
    }
}
