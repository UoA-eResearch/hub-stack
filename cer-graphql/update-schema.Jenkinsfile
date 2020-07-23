// Common Variables
slackChannel = 'research-hub'
slackCredentials = 'UoA-Slack-Access-Research-Hub'

pipeline {
    agent  {
        label("uoa-buildtools-ionic")
    }

    environment {
        // Set environment variables for cer-graphql tests
        CONTENTFUL_ACCESS_TOKEN = credentials('contentful-access-token')
        CONTENTFUL_SPACE_ID = credentials('contentful-space-id')
        COGNITO_REGION = credentials('cognito-region')
        COGNITO_USER_POOL = credentials('cognito-user-pool')
    }

    stages {

        stage('Checkout') {
            steps {
                slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "Reloading schema for cer-graphql - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
            }
        }

        stage('Set environment variables') {
            steps {
                script {
                    echo 'Setting environment variables'
                    env.awsRegion = "ap-southeast-2"
                    if (BRANCH_NAME == 'sandbox') {
                        echo 'Setting variables for sandbox deployment'
                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        env.awsProfile = 'uoa-sandbox'
                        env.awsAccountId = '416527880812'
                    } else if (BRANCH_NAME == 'nonprod') {
                        echo 'Setting variables for nonprod deployment'
                        env.awsCredentialsId = 'aws-its-nonprod-access'
                        env.awsTokenId = 'aws-its-nonprod-token'
                        env.awsProfile = 'uoa-its-nonprod'
                        env.awsAccountId = 'uoa-nonprod-account-id'
                    } else if (BRANCH_NAME == 'prod') {
                        echo 'Setting variables for prod deployment'
                        env.awsCredentialsId = 'uoa-its-prod-access'
                        env.awsTokenId = 'uoa-its-prod-token'
                        env.awsProfile = 'uoa-its-prod'
                        env.awsAccountId = 'uoa-prod-account-id'
                    } else {
                        echo 'You are not on an environment branch, defaulting to sandbox'
                        BRANCH_NAME = 'sandbox'
                        env.awsAccountId = '416527880812'
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

        stage('Restart content API') {
            steps{
                script {
                    echo "Restarting service."
                    sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster --service cer-graphql-service --task-definition cer-graphql-task --force-new-deployment --region ${awsRegion}"                }
            }
        }
    }

    post {
        success {
            echo 'Schema update job ran successfully. Deployed to ' + BRANCH_NAME
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "🚀 Build successful - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
        failure {
            echo 'Schema update job failed :('
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, message: "🔥 Build failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}
