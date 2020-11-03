// Common Variables
slackChannel = 'research-hub'
slackCredentials = 'UoA-Slack-Access-Research-Hub'

pipeline {

    parameters {
        booleanParam(name: "FORCE_REDEPLOY_WEB", defaultValue: false, description: 'Force redeploy the web frontend even if there are no code changes.' )
        booleanParam(name: "FORCE_REDEPLOY_CG", defaultValue: false, description: 'Force redeploy the cer-graphql API even if there are no code changes.')
        booleanParam(name: "FORCE_REDEPLOY_SN", defaultValue: false, description: 'Force redeploy the serverless-now API even if there are no code changes.')
    }

    agent  {
        label("uoa-buildtools-ionic")
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#D4DADF", message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
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
                        env.awsRole = 'devops'
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
                    echo "Copying in credentials file"
                    // Copy in secrets file from Jenkins so build and test
                    // work properly.
                    withCredentials([
                        file(credentialsId: "credentials-${BRANCH_NAME}",variable:"credentialsfile")
                    ]) {
                        sh "cp $credentialsfile .env"
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
                        sh "python3 /home/jenkins/aws_saml_login.py --idp iam.auckland.ac.nz --user $awsUsername --password $awsPassword --token $awsToken --profile ${awsProfile} --role ${awsRole}"
                    }
                }
            }
        }

        stage('Build projects') {
            parallel {
                stage('Build research-hub-web') {
                    when {
                        anyOf {
                            changeset "**/research-hub-web/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                        }
                    }
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
                        anyOf {
                            changeset "**/cer-graphql/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_CG
                        }
                    }
                    steps {
                        echo 'Building cer-graphql project'
                        dir("cer-graphql") {
                            echo "Building the docker image and tag it as latest"
                            sh "docker build . -t cer-graphql:latest"
                        }
                    }
                }
                stage('Build serverless-now') {
                    when {
                        anyOf {
                            changeset "**/serverless-now/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SN
                        }
                    }
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
                    when {
                        anyOf {
                            changeset "**/research-hub-web/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                        }
                    }
                    steps {
                        echo 'Testing research-hub-web project'

                        dir("research-hub-web") {
                            echo 'Running research-hub-web unit tests'
                            sh 'npm run test-ci'

                            echo 'Running research-hub-web e2e tests'
                            sh "npx webdriver-manager update --versions.chrome=\$(google-chrome --version | grep -ioE \"[0-9.]{10,20}\")"
                            sh "npm run e2e-ci -- -c ${BRANCH_NAME}"
                        }
                    }
                }
                stage('Run cer-graphql tests') {
                    when {
                        anyOf {
                            changeset "**/cer-graphql/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_CG
                        }
                    }
                    steps {
                        echo 'Testing cer-graphql project'
                        dir('cer-graphql') {
                            sh "npm install"
                            sh "npm run test"
                        }
                    }
                }
                stage('Run serverless-now tests') {
                    when {
                        anyOf {
                            changeset "**/serverless-now/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SN
                        }
                    }
                    steps {
                        echo "Invoking serverless-now tests..."
                        dir('serverless-now') {
                            sh "npm run test -- --aws-profile ${awsProfile} --stage ${BRANCH_NAME}"
                        }
                    }
                }
            }
        }

        stage('Deploy projects') {
            parallel {
                stage('Deploy research-hub-web') {
                    when {
                        anyOf {
                            changeset "**/research-hub-web/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                        }
                    }
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
                        anyOf {
                            changeset "**/cer-graphql/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_CG
                        }
                    }
                    steps {
                        echo 'Deploying cer-graphql image to ECR on ' + BRANCH_NAME
                        echo "Logging in to ECR"
                        sh "(aws ecr get-login --no-include-email --region ${awsRegion} --profile=${awsProfile}) | /bin/bash"

                        echo "Tagging built image with ECR tag"
                        sh "docker tag cer-graphql:latest ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/research-hub/cer-graphql:latest"

                        echo "Pushing built image to ECR"
                        sh "docker push ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/research-hub/cer-graphql:latest"

                        echo 'Deploying cer-graphql image from ECR to Fargate on ' + BRANCH_NAME
                        sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster --service cer-graphql-service --task-definition cer-graphql-task --force-new-deployment --region ${awsRegion}"
                    }
                }
                stage('Deploy serverless-now') {
                    when {
                        anyOf {
                            changeset "**/serverless-now/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SN
                        }
                    }
                    steps {
                        echo "Deploying serverless-now Lambda function to ${BRANCH_NAME}"
                        dir("serverless-now") {
                            sh "npm run deploy -- --aws-profile ${awsProfile} --stage ${BRANCH_NAME}"
                        }
                    }
                }
            }
        }

        stage('BrowserStack e2e Tests') {
            steps {
                echo 'Deployed to ' + BRANCH_NAME + ' launching BrowserStack e2e Tests'
                slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#5eff00", message: "🚀 Deploy successful - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>).\n 📹 Launching BrowserStack e2e tests. <https://automate.browserstack.com/dashboard|Watch Videos>")
                dir("research-hub-web") {
                    script {
                        try {
                            sh "./node_modules/.bin/protractor protractor.conf.browserstack-remote --baseUrl='https://research-hub.sandbox.amazon.auckland.ac.nz/'" // TODO: Replace hardcoded URL
                        } catch(exc) {
                            echo 'BrowserStack e2e tests failed'
                            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#f2ae3f", message: "🙅‍♀️🙅🙅‍♂️ One or more BrowserStack e2e tests failed. Consider reverting to an earlier deploy")
                            exit 1
                        }
                    }
                }
            }
        }
    }
    
    post {
        success {
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#5eff00", message: "🙆‍♀️🙆🙆‍♂️ All BrowserStack e2e tests passed")
        }
        failure {
            echo 'Jenkins job failed :('
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#FF9FA1", message: "🔥 Build failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}
