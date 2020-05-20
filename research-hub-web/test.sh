#!/bin/bash

# Specify host_urls here
host_urls[1]='https://research-hub.auckland.ac.nz'
host_urls[2]='https://test.research-hub.cer.auckland.ac.nz'
host_urls[3]='https://dev.research-hub.cer.auckland.ac.nz'
host_urls[4]='localhost'

echo "======================================================"
echo "=        Welcome to the ResearchHub Test Runner      ="
echo "======================================================"

echo -e "\nWhich sort of tests would you like to run?"
echo "[1] Unit Tests"
echo "[2] e2e Tests"
read -p "Choice: " testType 


# Unit Testing Functionality
if [ "$testType" = 1 ]; then
    echo "Launching unit tests"
    ng test
    exit
fi

# E2E Testing Functionality
echo -e "\nWhich host would you like to test?"
echo "[1] Prod"
echo "[2] Test"
echo "[3] Dev"
echo "[4] Local"
read -p "Choice: " host

echo -e "\nWhich Selenium server would you like to use for testing?"
echo "[1] BrowserStack's"
echo "[2] Local"
read -p "Choice: " seleniumServer

echo
# Accepts URL argument
run_protractor() {
    if [ "$seleniumServer" = 1 ]; then
        if [ "$host" = 1 ]; then
            echo "Running BrowserStack tests against remote host: $1"
            ./node_modules/.bin/protractor protractor.conf.browserstack-remote --baseUrl  $1
        else
            echo "Running BrowserStack tests against local host: $1"
            ./node_modules/.bin/protractor protractor.conf.browserstack-local --baseUrl  $1
        fi
    else
        echo "Running Local Selenium tests against host: $1"
        ./node_modules/.bin/protractor protractor.conf.js --baseUrl  $1
    fi
}

run_protractor ${host_urls[$host]}