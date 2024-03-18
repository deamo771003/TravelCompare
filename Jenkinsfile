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
            console.log('All pass')
        }
        failure {
            console.log('Test fale')
        }
    }
}
