// Common Variables
slackChannel = 'research-hub'
slackCredentials = 'UoA-Slack-Access-Research-Hub'

pipeline {
    agent  {
        label("uoa-buildtools-ionic")
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
            }
        }

        stage('Set environment variables') {
            steps {
                script {
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
                        BRANCH_NAME = 'sandbox'

                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        env.awsProfile = 'uoa-sandbox'
                    }
                }
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
                    // when {
                    //     changeset "**/research-hub-web/*.*"
                    // }
                    steps {
                        echo 'Building research-hub-web project'
                        dir("research-hub-web") {
                            echo 'Installing research-hub-web dependencies'
                            sh "npm install"

                            echo 'Building for production'
                            sh "npm run build -- -c ${BRANCH_NAME}"
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
                    // when {
                    //     changeset "**/serverless-now/*.*"
                    // }
                    steps {
                        dir("serverless-now") {
                            echo 'Installing serverless-now dependencies...'
                            sh "npm install"
                        }
                    }
                }
            }
        }

        stage('Run tests') {
            parallel {
                stage('Run research-hub-web tests') {
                    // when {
                    //     changeset "**/research-hub-web/*.*"
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
                    // when {
                    //     changeset "**/cer-graphql/*.*"
                    // }
                    steps {
                        echo 'Testing cer-graphql project'
                    }
                }
                stage('Run serverless-now tests') {
                    when {
                        changeset "**/serverless-now/*.*"
                    }
                    steps {
                        echo "Invoking serverless-now tests..."
                        dir('serverless-now') {
                           sh "sls invoke test --aws-profile ${awsProfile}"
                        }
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
                    // when {
                    //     changeset "**/serverless-now/*.*"
                    // }
                    steps {
                        echo "Deploying serverless-now Lambda function to ${BRANCH_NAME}"
                        dir("serverless-now") {
                            sh "sls deploy --aws-profile ${awsProfile}"
                        }
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Jenkins job ran successfully. Deployed to ' + BRANCH_NAME
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "🚀 Build successful - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
        failure {
            echo 'Jenkins job failed :('
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "🔥 Build failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}