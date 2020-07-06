pipeline {
    agent  {
        label("uoa-buildtools-ionic")
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set environment variables') {
            echo 'Setting environment variables'

            if (BRANCH_NAME == 'sandbox') {
                echo 'Setting variables for sandbox deployment'
                env.awsCredentialsId = 'aws-sandbox-user'
                env.awsTokenId = 'aws-sandbox-token'
                env.awsProfile = 'uoa-sandbox'

            } else if (BRANCH_NAME == 'nonprod') {
                echo 'Setting variables for nonprod deployment'
                env.awsCredentialsId = 'aws-its-nonprod-access'
                env.awsTokenId = 'aws-its-nonprod-token'
                env.awsProfile = 'uoa-its-nonprod'

            } else if (BRANCH_NAME == 'prod') {
                echo 'Setting variables for prod deployment'
                env.awsCredentialsId = 'uoa-its-prod-access'
                env.awsTokenId = 'uoa-its-prod-token'
                env.awsProfile = 'uoa-its-prod'

            } else {
                echo 'You are not on an environment branch, defaulting to sandbox'
                env.awsCredentialsId = 'aws-sandbox-user'
                env.awsTokenId = 'aws-sandbox-token'
                env.awsProfile = 'uoa-sandbox'
            }
        }

        stage('AWS Credential Grab') {
            steps{
                script {
                    echo "☯ Authenticating with AWS"

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
                    // TODO: Enable after devops setup completed
                    // when {
                    //     changeset "**/research-hub-web/*.*"
                    // }
                    steps {
                        echo 'Building research-hub-web project'
                        dir("research-hub-web") {
                            echo 'Installing research-hub-web dependencies'
                            sh "npm install"

                            echo 'Building for production'
                            sh "npm run build --prod"
                        }
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
                    // TODO: Enable after devops setup completed
                    // when {
                        // changeset "**/research-hub-web/*.*"
                    // }
                    steps {
                        echo 'Testing research-hub-web project'

                        dir("research-hub-web") {
                            echo 'Running research-hub-web unit tests'
                            sh 'npm run test-headless'

                            echo 'Running research-hub-web e2e tests'
                            sh 'npm run e2e'
                        }
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
                    // when {
                    //     changeset "**/research-hub-web/*.*"
                    // }
                    stages {
                        stage('Deploy to S3 bucket') {
                            steps {
                                script {
                                    echo 'Deploying research-hub-web to S3 on ' + BRANCH_NAME
                                    def s3BucketName = 'research-hub-web'

                                    dir("research-hub-web") {
                                        sh "aws s3 sync www s3://${s3BucketName} --delete --profile ${awsProfile}"
                                        echo "Sync complete"
                                    }
                                }
                            }
                        }
                        stage('Invalidate CloudFront') {
                            steps {
                                script {
                                    echo "Invalidating..."

                                    // TODO: Enter nonprod/prod CloudFrontDistroIds
                                    def awsCloudFrontDistroId = (
                                        env.BRANCH_NAME == 'prod' ? '' :
                                        env.BRANCH_NAME == 'nonprod' ? '' :
                                        'E20R95KPAKSWTG'
                                    )

                                    echo "Cloudfront distro id: ${awsCloudFrontDistroId}"
                                    sh "aws cloudfront create-invalidation --distribution-id ${awsCloudFrontDistroId} --paths '/*' --profile ${awsProfile}"
                                    echo "Invalidation started"
                                }
                            }
                        }
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