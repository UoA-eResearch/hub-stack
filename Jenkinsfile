// Common Variables
slackChannel = 'research-hub'
slackCredentials = 'UoA-Slack-Access-Research-Hub'
awsProfile = ''

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
                    env.awsRegion = 'ap-southeast-2'
                    if (BRANCH_NAME.matches('sandbox(.*)')) {
                        echo 'Setting variables for sandbox deployment'
                        env.BRANCH_NAME = 'sandbox'
                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        awsProfile = 'uoa-sandbox'
                        env.awsAccountId = '416527880812'
                    } else if (BRANCH_NAME.matches('dev(.*)')) {
                        env.BRANCH_NAME = 'dev'
                        echo 'Setting variables for dev deployment'
                        env.awsCredentialsId = 'aws-its-nonprod-access'
                        env.awsTokenId = 'aws-its-nonprod-token'
                        awsProfile = 'uoa-its-nonprod'
                        env.awsAccountId = '518380838815'
                    } else if (BRANCH_NAME == 'test') {
                        echo 'Setting variables for test deployment'
                        env.awsCredentialsId = 'aws-its-nonprod-access'
                        env.awsTokenId = 'aws-its-nonprod-token'
                        awsProfile = 'uoa-its-nonprod'
                        env.awsAccountId = '518380838815'
                    } else if (BRANCH_NAME == 'prod') {
                        echo 'Setting variables for prod deployment'
                        env.awsCredentialsId = 'aws-its-prod'
                        env.awsTokenId = 'Access token for ITS Prod Account'
                        awsProfile = 'uoa-its-prod'
                        env.awsAccountId = '291148375163'
                    } else {
                        echo 'You are not on an environment branch, defaulting to sandbox'
                        env.BRANCH_NAME = 'sandbox'
                        env.awsAccountId = '416527880812'
                        env.awsCredentialsId = 'aws-sandbox-user'
                        env.awsTokenId = 'aws-sandbox-token'
                        awsProfile = 'uoa-sandbox'
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
                        sh "python3 /home/jenkins/aws_saml_login.py --idp iam.auckland.ac.nz --user $awsUsername --password $awsPassword --token $awsToken --role devops --profile " + awsProfile
                    }
                }
            }
        }

        stage('Build projects') {
            stages {
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
                stage('Build research-hub-web') {
                    when {
                        anyOf {
                            changeset "**/research-hub-web/**/*.*"
                            equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                        }
                    }
                    stages {
                        stage ('Building and caching new node_modules') {
                            // when {
                            //     anyOf {
                            //         changeset "**/research-hub-web/package.json"
                            //         equals expected: true, actual: params.FORCE_REDEPLOY_WEB
                            //     }
                            // }
                            steps {
                                echo 'Installing research-hub-web dependencies.'
                                dir("research-hub-web") {
                                    sh "npm install"
                                    sh "mkdir -p ${HOME}/research-hub-web/"
                                    // sh "tar cvfz ./node_modules.tar.gz node_modules" // Cache new node_modules/ folder
                                    // script {
                                    //     archiveArtifacts artifacts: "node_modules.tar.gz", onlyIfSuccessful: true
                                    // }
                                }
                            }
                        }
                        // stage ('Using cached node_modules from archive') {
                        //     when {
                        //         not {
                        //             anyOf {
                        //                 changeset "**/research-hub-web/package.json"
                        //             }
                        //         }
                        //     }
                        //     steps {
                        //         echo 'Building research-hub-web project from stored dependencies.'
                        //         dir("research-hub-web") {
                        //             copyArtifacts filter: 'node_modules.tar.gz', fingerprintArtifacts: true, optional: true, projectName: "Centre for eResearch (CeR)/hub-stack-pipeline/${BRANCH_NAME}" , selector: lastWithArtifacts()
                        //             sh "tar xf ./node_modules.tar.gz" // Unzip cached node_modules/ folder
                        //             sh "npm install"
                        //         }
                        //     }
                        // }
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
                            // TODO Disable tests for now, make them work in Jenkins!
                            // echo 'Running research-hub-web unit tests'
                            // sh 'npm run test-ci'

                            // echo 'Running research-hub-web e2e tests'
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
                        script {
                            if (env.BRANCH_NAME != 'prod') {    // tests rely on 2FAB so we do not test in prod
                                echo 'Testing cer-graphql project'
                                dir('cer-graphql') {
                                    sh "npm install"
                                    sh "export stage=${BRANCH_NAME} && npm run test -- --aws-profile=${awsProfile}"
                                }
                            }
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
                            if (env.BRANCH_NAME != 'prod') {
                                echo "Testing hub-search-proxy project"
                                dir('hub-search-proxy') {
                                    sh "npm run test -- --aws-profile ${awsProfile} --stage ${env.BRANCH_NAME}"
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
                                    
                                    def s3BucketName = (
                                        env.BRANCH_NAME == 'prod' ? 'research-hub.auckland.ac.nz' : 
                                        env.BRANCH_NAME == 'test' ? 'research-hub.connect.test.amazon.auckland.ac.nz' : 
                                        env.BRANCH_NAME == 'dev' ? 'research-hub-dev.connect.test.amazon.auckland.ac.nz' : 
                                        'research-hub-web'
                                    )

                                    def previewS3BucketName = (
                                        env.BRANCH_NAME == 'prod' ? 'research-hub-preview.auckland.ac.nz' : 
                                        env.BRANCH_NAME == 'test' ? 'research-hub-preview.connect.test.amazon.auckland.ac.nz' : 
                                        env.BRANCH_NAME == 'dev' ? 'research-hub-dev-preview.connect.test.amazon.auckland.ac.nz' : 
                                        'research-hub-web-preview'
                                    )

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

                                    // TODO: Enter dev/test/prod CloudFrontDistroIds
                                    def awsCloudFrontDistroId = (
                                        env.BRANCH_NAME == 'prod' ? '' :
                                        env.BRANCH_NAME == 'test' ? 'E1HU1AQ31JKDT9' :
                                        env.BRANCH_NAME == 'dev' ? 'E35ROORLYFFYM4' :
                                        'E20R95KPAKSWTG'
                                    )

                                    def previewAwsCloudFrontDistroId = (
                                        env.BRANCH_NAME == 'prod' ? '' :
                                        env.BRANCH_NAME == 'test' ? 'E1U7DUEU5EBP41' :
                                        env.BRANCH_NAME == 'dev' ? 'E2MW26HILK658J' :
                                        'E2GBENCKM7YT9Q'
                                    )

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
                    steps {     // TODO: may need to modify commands once we have both dev & test in nonprod account
                        echo 'Deploying cer-graphql image to ECR on ' + BRANCH_NAME
                        echo "Logging in to ECR"
                        sh "(aws ecr get-login --no-include-email --region ${awsRegion} --profile=${awsProfile}) | /bin/bash"

                        echo "Tagging built image with ECR tag"
                        sh "docker tag cer-graphql:latest ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/research-hub/cer-graphql-${BRANCH_NAME}:latest"

                        echo "Pushing built image to ECR"
                        sh "docker push ${awsAccountId}.dkr.ecr.${awsRegion}.amazonaws.com/research-hub/cer-graphql-${BRANCH_NAME}:latest"

                        echo 'Deploying cer-graphql image from ECR to Fargate on ' + BRANCH_NAME
                        sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster-${BRANCH_NAME} --service cer-graphql-service-${BRANCH_NAME} --task-definition cer-graphql-${BRANCH_NAME} --force-new-deployment --region ${awsRegion}"
                        sh "aws ecs update-service --profile ${awsProfile} --cluster cer-graphql-cluster-${BRANCH_NAME} --service cer-graphql-preview-service-${BRANCH_NAME} --task-definition cer-graphql-preview-${BRANCH_NAME} --force-new-deployment --region ${awsRegion}"
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
                            dir("hub-search-proxy") {
                                sh "npm run deploy -- --aws-profile ${awsProfile} --stage ${BRANCH_NAME}"
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
