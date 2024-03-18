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
            console.log('All pass')
        }
        failure {
            console.log('Test fale')
        }
    }
}
