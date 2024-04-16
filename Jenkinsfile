pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('7d8640f0-77ab-4dcb-a2ea-10e508ae9749')
        REPO_OWNER = 'deamo771003'
        REPO_NAME = 'TravelCompare'
        SSH_CREDENTIALS_ID = 'bc3e53a2-ef66-4479-9f53-b485d5f118cc'
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
        stage('Cleanup') {
            steps {
                script {
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
    }
    post {
        success {
            echo 'Tests passed successfully!'
            sh """
                curl -X POST -H 'Authorization: token ${GITHUB_TOKEN}' \\
                    -H 'Content-Type: application/json' \\
                    -d '{"state": "success", "description": "Tests succeeded.", "context": "continuous-integration/jenkins"}' \\
                    'https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/statuses/${env.GIT_COMMIT}'
            """
        }
        failure {
            echo 'Tests failed.'
            sh """
                curl -X POST -H 'Authorization: token ${GITHUB_TOKEN}' \\
                    -H 'Content-Type: application/json' \\
                    -d '{"state": "failure", "description": "Tests failed.", "context": "continuous-integration/jenkins"}' \\
                    'https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/statuses/${env.GIT_COMMIT}'
            """
        }
    }
}