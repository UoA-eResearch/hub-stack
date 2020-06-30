pipeline {
    agent  {
        label("uoa-buildtools-ionic")
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage('AWS Credential Grab') {
            steps{
                script {
                    echo "☯ Authenticating with AWS"

                    def awsCredentialsId = ''
                    def awsTokenId = ''
                    def awsProfile = ''

                    if (BRANCH_NAME == 'sandbox') {
                        echo 'Setting variables for sandbox deployment'
                        awsCredentialsId = 'aws-sandbox-user'
                        awsTokenId = 'aws-sandbox-token'
                        awsProfile = 'uoa-sandbox'

                    } else if (BRANCH_NAME == 'nonprod') {
                        echo 'Setting variables for nonprod deployment'
                        awsCredentialsId = 'aws-its-nonprod-access'
                        awsTokenId = 'aws-its-nonprod-token'
                        awsProfile = 'uoa-its-nonprod'

                    } else if (BRANCH_NAME == 'prod') {
                        echo 'Setting variables for prod deployment'
                        awsCredentialsId = 'uoa-its-prod-access'
                        awsTokenId = 'uoa-its-prod-token'
                        awsProfile = 'uoa-its-prod'

                    } else {
                        echo 'You are not on an environment branch, defaulting to sandbox'
                        awsCredentialsId = 'aws-sandbox-user'
                        awsTokenId = 'aws-sandbox-token'
                        awsProfile = 'uoa-sandbox'
                    }

                    withCredentials([
                        usernamePassword(credentialsId: "${awsCredentialsId}", passwordVariable: 'awsPassword', usernameVariable: 'awsUsername'),
                        string(credentialsId: "${awsTokenId}", variable: 'awsToken')
                    ]) {
                        sh "python3 /home/jenkins/aws_saml_login.py --idp iam.auckland.ac.nz --user $awsUsername --password $awsPassword --token $awsToken --profile ${awsProfile}"
                    }
                }
            }
        }
        
        stage('Build projects') {
            parallel {
                stage('Build research-hub-web') {
                    // when {
                    //     changeset "**/research-hub-web/*.*"
                    // }
                    steps {
                        echo 'Building research-hub project'
                        sh "cd research-hub-web"
                        sh "npm install"
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