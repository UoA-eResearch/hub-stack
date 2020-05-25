pipeline {
    agent any

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        
        stage('Run tests') {
            parallel {
                stage('Run research-hub-web tests') {
                    when {
                        changeset "**/research-hub-web/*.*"
                    }
                    steps {
                        echo 'Testing research-hub-web project'
                    }
                }
                stage('Run cer-graphql tests') {
                    when {
                        changeset "**/cer-graphql/*.*"
                    }
                    steps {
                        echo 'Testing cer-graphql project'
                    }
                }
                stage('Run serverless-now tests') {
                    when {
                        changeset "**/serverless-now/*.*"
                    }
                    steps {
                        echo 'Testing serverless-now project'
                    }
                }
            }
        }  
        
        stage('Build projects') {
            parallel {
                stage('Build research-hub-web') {
                    when {
                        changeset "**/research-hub-web/*.*"
                    }
                    steps {
                        echo 'Building research-hub project'
                    }
                }
                stage('Build cer-graphql') {
                    when {
                        changeset "**/cer-graphql/*.*"
                    }
                    steps {
                        echo 'Building cer-graphql project'
                    }
                }
                stage('Build serverless-now') {
                    when {
                        changeset "**/serverless-now/*.*"
                    }
                    steps {
                        echo 'Building serverless-now project'
                    }
                }
            }
        }
  
        stage('Deploy projects') {
            parallel {
                stage('Deploy research-hub-web') {
                    when {
                        changeset "**/research-hub-web/*.*"
                    }
                    steps {
                        echo 'Deploying research-hub-web to S3 on ' + BRANCH_NAME
                    }
                }
                stage('Deploy cer-graphql') {
                    when {
                        changeset "**/cer-graphql/*.*"
                    }
                    steps {
                        echo 'Deploying cer-graphql image to ECR on ' + BRANCH_NAME
                        echo 'Deploying cer-graphql image from ECR to Fargate on ' + BRANCH_NAME
                    }
                }
                stage('Deploy serverless-now') {
                    when {
                        changeset "**/serverless-now/*.*"
                    }
                    steps {
                        echo 'Deploying serverless-now Lambda function to ' + BRANCH_NAME
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Jenkins job ran successfully. Deployed to ' + BRANCH_NAME
        }
        failure {
            echo 'Jenkins job failed :('
        }
    }
}