pipeline {
    agent any

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("Build research-hub") {
            when {
                changeset "**/research-hub-web/*.*"
            }
            steps {
                echo "Building research-hub-web branch: " + env.BRANCH_NAME
            }
        }
        stage("Build cer-graphql") {
            when {
                changeset "**/cer-graphql/*.*"
            }
            steps {
                echo "Building cer-graphql branch: " + env.BRANCH_NAME
            }
        }
    }
}