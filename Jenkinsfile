pipeline {
    agent any
    tools {
        nodejs 'node-21.7.1'
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
