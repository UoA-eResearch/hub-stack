// Common Variables
slackChannel = 'research-hub'
slackCredentials = 'UoA-Slack-Access-Research-Hub'

pipeline {

    parameters {
        booleanParam(name: "FORCE_REDEPLOY_WEB", defaultValue: false, description: 'Force redeploy the web frontend even if there are no code changes.' )
        booleanParam(name: "FORCE_REDEPLOY_CG", defaultValue: false, description: 'Force redeploy the cer-graphql API even if there are no code changes.')
        booleanParam(name: "FORCE_REDEPLOY_SP", defaultValue: false, description: 'Force redeploy the search-proxy Lambda  even if there are no code changes.')
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
                    env.awsRole = 'devops'
                    if (BRANCH_NAME == 'sandbox') {
                        echo 'Setting variables for sandbox deployment'
                        env.BRANCH_NAME = 'sandbox'
                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        env.awsProfile = 'uoa-sandbox'
                        env.awsAccountId = '416527880812'
                        env.awsRole = 'devops'
                        env.SCHEMA_PATH = 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/'
                        env.s3BucketName = "research-hub-web"
                        env.previewS3BucketName = "research-hub-web-preview"
                    } else if (BRANCH_NAME == 'nonprod') {
                        echo 'Setting variables for nonprod deployment'
                        env.awsCredentialsId = 'aws-its-nonprod-access'
                        env.awsTokenId = 'aws-its-nonprod-token'
                        env.awsProfile = 'uoa-its-nonprod'
                        env.awsAccountId = '518380838815'
                        env.awsRole = 'devops'
                        env.SCHEMA_PATH = 'https://rhubcpapi.connect.test.amazon.auckland.ac.nz/cer-graphql-service'
                        env.s3BucketName = "research-hub.connect.test.amazon.auckland.ac.nz"
                        env.previewS3BucketName = "research-hub-preview.connect.test.amazon.auckland.ac.nz"
                    } else if (BRANCH_NAME == 'prod') {
                        echo 'Setting variables for prod deployment'
                        env.awsCredentialsId = 'uoa-its-prod-access'
                        env.awsTokenId = 'uoa-its-prod-token'
                        env.awsProfile = 'uoa-its-prod'
                        env.awsAccountId = 'uoa-prod-account-id'
                        env.s3BucketName = "s3-bucket-name-prod"
                        env.previewS3BucketName = "preview-s3-bucket-name-prod"
                    } else {
                        echo 'You are not on an environment branch, defaulting to sandbox'
                        BRANCH_NAME = 'sandbox'
                        env.BRANCH_NAME = 'sandbox'
                        env.awsAccountId = '416527880812'
                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        env.awsProfile = 'uoa-sandbox'
                        env.awsRole = 'devops'
                        env.SCHEMA_PATH = 'https://rhubcpapi.sandbox.amazon.auckland.ac.nz/'
                        env.s3BucketName = "research-hub-web"
                        env.previewS3BucketName = "research-hub-web-preview"
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
                    stages {
                        stage ('Building and caching new node_modules') {
                            when {
                                anyOf {
                                    changeset "**/research-hub-web/package.json"
                                    equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                                }
                            }
                            steps {
                                echo 'Installing research-hub-web dependencies.'
                                dir("research-hub-web") {
                                    sh "npm install"
                                    sh "mkdir -p ${HOME}/research-hub-web/"
                                    sh "tar cvfz ./node_modules.tar.gz node_modules" // Cache new node_modules/ folder
                                    script {
                                        archiveArtifacts artifacts: "node_modules.tar.gz", onlyIfSuccessful: true
                                    }
                                }
                            }
                        }
                        stage ('Using cached node_modules from archive') {
                            when {
                                not {
                                    anyOf {
                                        changeset "**/research-hub-web/package.json"
                                    }
                                }
                            }
                            steps {
                                echo 'Building research-hub-web project from stored dependencies.'
                                dir("research-hub-web") {
                                    copyArtifacts filter: 'node_modules.tar.gz', fingerprintArtifacts: true, optional: true, projectName: 'Centre for eResearch (CeR)/hub-stack-pipeline/sandbox' , selector: lastWithArtifacts()
                                    sh "tar xf ./node_modules.tar.gz" // Unzip cached node_modules/ folder
                                    sh "npm install"
                                }
                            }
                        }
                        stage ('Building for production') {
                            steps {
                                dir("research-hub-web") {
                                    echo 'Building for production'
                                    sh "npm run build -- -c ${BRANCH_NAME}"
                                    echo 'Building preview for production'
                                    sh "npm run build -- -c ${BRANCH_NAME}-preview --output-path www-preview"
                                }
                            }
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
                stage('Build search-proxy') {
                    when {
                        anyOf {
                            changeset "**/hub-search-proxy/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SP
                        }
                    }
                    steps {
                        dir("hub-search-proxy") {
                            echo 'Installing search-proxy dependencies...'
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
                            // sh "npm run e2e-ci"
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
                stage('Run search-proxy tests') {
                    when {
                        anyOf {
                            changeset "**/hub-search-proxy/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SP
                        }
                    }
                    steps {
                        script {
                            if (BRANCH_NAME == 'sandbox' || BRANCH_NAME == 'nonprod') {
                                echo "Invoking search-proxy tests..."

                                def stage = (
                                    BRANCH_NAME == 'prod' ? 'prod' : 
                                    BRANCH_NAME == 'nonprod' ? 'test' : 
                                    'dev'
                                )

                                dir('hub-search-proxy') {
                                    sh "npm run test -- --aws-profile ${awsProfile} --stage ${stage}"
                                }
                            }
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
                                    dir("research-hub-web") {
                                        sh "aws s3 sync www s3://${s3BucketName} --delete --profile ${awsProfile}"
                                        echo "Sync complete"
                                        sh "aws s3 sync www-preview s3://${previewS3BucketName} --delete --profile ${awsProfile}"
                                        echo "Preview sync complete"
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
                                        env.BRANCH_NAME == 'nonprod' ? 'E22KP4O00VK941' :
                                        'E20R95KPAKSWTG'
                                    )

                                    def previewAwsCloudFrontDistroId = (
                                        env.BRANCH_NAME == 'prod' ? '' :
                                        env.BRANCH_NAME == 'nonprod' ? 'E1V3EOI1YKYNGI' :
                                        'E2GBENCKM7YT9Q'                                    )

                                    echo "Cloudfront distro id: ${awsCloudFrontDistroId}"
                                    sh "aws cloudfront create-invalidation --distribution-id ${awsCloudFrontDistroId} --paths '/*' --profile ${awsProfile}"
                                    echo "Invalidation started"
                                    sh "aws cloudfront create-invalidation --distribution-id ${previewAwsCloudFrontDistroId} --paths '/*' --profile ${awsProfile}"
                                    echo "Preview invalidation started"
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
                        sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster --service cer-graphql-service --task-definition cer-graphql --force-new-deployment --region ${awsRegion}"
                        sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster --service cer-graphql-preview-service --task-definition cer-graphql-preview --force-new-deployment --region ${awsRegion}"
                    }
                }
                stage('Deploy search-proxy') {
                    when {
                        anyOf {
                            changeset "**/hub-search-proxy/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_SP
                        }
                    }
                    steps {
                        echo "Deploying hub-search-proxy Lambda function to ${BRANCH_NAME}"
                        script {
                            def stage = (
                                BRANCH_NAME == 'prod' ? 'prod' : 
                                BRANCH_NAME == 'nonprod' ? 'test' : 
                                'dev'
                            )
                            
                            dir("hub-search-proxy") {
                                sh "npm run deploy -- --aws-profile ${awsProfile} --stage ${stage}"
                            }
                        }
                        echo "Deploy to ${BRANCH_NAME} complete"
                        
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployed to ' + BRANCH_NAME
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#5eff00", message: "🚀 Deploy successful - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>).")
        }
        failure {
            echo 'Jenkins job failed :('
            slackSend(channel: slackChannel, tokenCredentialId: slackCredentials, color: "#FF9FA1", message: "🔥 Build failed - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}
