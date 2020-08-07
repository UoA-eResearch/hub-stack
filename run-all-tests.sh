#!/bin/bash

function header() {
    echo
    local l=; builtin printf -vl "%${2:-${COLUMNS:-`tput cols 2>&-||echo 80`}}s" && echo -e "${l// /=}"; 
    printf "%*s\n" $[$(tput cols)/2] "$1"
    local l=; builtin printf -vl "%${2:-${COLUMNS:-`tput cols 2>&-||echo 80`}}s" && echo -e "${l// /=}"; 
    echo
}

header "Cer GraphQL"
echo "Executing integration tests..."
cd ./cer-graphql;
npm run test -- --silent

header "ServerlessNow"
echo "Executing unit tests..."
cd  ../serverless-now
npm run test 

header "Research-Hub-Web"
echo "Executing unit tests..."
cd  ../research-hub-web
npm run test

echo "\nExecuting e2e tests..."
npm run e2e