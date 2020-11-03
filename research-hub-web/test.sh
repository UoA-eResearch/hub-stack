#!/bin/bash

# Specify host_urls here
host_urls[1]='https://research-hub.sandbox.amazon.auckland.ac.nz/'
host_urls[2]='https://research-hub.auckland.ac.nz/#/'
host_urls[3]='https://test.research-hub.cer.auckland.ac.nz/#/'
host_urls[4]='https://dev.research-hub.cer.auckland.ac.nz/#/'
host_urls[5]='http://localhost:4200/'

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
echo "[1] Sandbox"
echo "[2] Prod"
echo "[3] Test"
echo "[4] Dev"
echo "[5] Local"
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
            ./node_modules/.bin/protractor protractor.conf.browserstack-remote --baseUrl="$1"
        else
            echo "Running BrowserStack tests against local host: $1"
            echo "Safari testing only supported on remote hosts, see https://www.browserstack.com/question/664"
            ./node_modules/.bin/protractor protractor.conf.browserstack-local --baseUrl="$1"
        fi
    else
        echo "Running Local Selenium tests against host: $1"
        echo "Make sure you are already serving locally on port 4200 (otherwise simply run ng e2e)"
        ./node_modules/.bin/protractor protractor.conf.js --baseUrl "$1"
    fi
}

run_protractor ${host_urls[$host]}