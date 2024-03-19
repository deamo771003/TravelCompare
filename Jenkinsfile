pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Check Cache') {
            steps {
                script {
                    if (fileExists('cached-node-modules')) {
                        sh 'cp -r cached-node-modules node_modules'
                    }
                }
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
                script {
                    if (!fileExists('cached-node-modules')) {
                        sh 'cp -r node_modules cached-node-modules'
                    }
                }
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
