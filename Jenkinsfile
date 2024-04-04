pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('02483d93-55c5-4bed-943e-0e64585dc92a')
    }

    stages {
        stage('Build Docker Network') {
            steps {
                script {
                    def networkExists = sh(script: "docker network ls | grep tc_network", returnStatus: true)
                    if (networkExists != 0) {
                        sh 'docker network create tc_network'
                    } else {
                        echo 'Network tc_network already exists'
                    }
                }
            }
        }
        stage('Build docker') {
            steps {
                sh 'docker build -t tc-image .'
            }
        }
        stage('Start App Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --env-file /var/jenkins/.env --name tc-container --network tc_network tc-image'
            }
        }
        stage('Test') {
            steps {
                 script {
                    try {
                        sh 'docker exec tc-container npm run test'
                        currentBuild.result = 'SUCCESS'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Tests success.'
            updateGitHubStatus('success', 'Tests succeeded.')
        }
        failure {
            echo 'Tests failed.'
            updateGitHubStatus('failure', 'Tests failed.')
        }
        always {
            sh 'docker stop tc-container || true'
            sh 'docker rm tc-container || true'
            sh 'docker rmi tc-image || true'
            sh 'docker network rm tc_network'
            sh 'docker image prune -f || true'
            sh 'docker system prune -f || true'
            echo 'Docker compose down executed.'
        }
    }
}
