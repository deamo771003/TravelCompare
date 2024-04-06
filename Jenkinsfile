pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('2bfd7c19-d0bf-4756-8c41-c0edced4b78d')
        REPO_OWNER = 'deamo771003'
        REPO_NAME = 'TravelCompare'
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
                sh 'docker exec tc-container npm config get cache'
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
        always {
            sh 'docker stop tc-container || true'
            sh 'docker rm tc-container || true'
            sh 'docker rmi tc-image || true'
            sh 'docker network rm tc_network'
            sh 'docker image prune -f || true'
            sh 'docker system prune -f || true'
            echo 'Docker compose down executed.'
            echo 'npm install test2'
        }
    }
}