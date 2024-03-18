pipeline {
    agent any

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
