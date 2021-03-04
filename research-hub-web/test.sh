#!/bin/bash

# Specify host_urls here
host_urls[1]='http://localhost:4200'
host_urls[2]='https://research-hub.sandbox.amazon.auckland.ac.nz'

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
echo "[1] Local"
echo "[2] Sandbox"
read -p "Choice: " host

echo -e "\nHow would you like to run your e2e tests?"
echo "[1] Headless"
echo "[2] Graphical"
read -p "Choice: " e2eTestType

echo

run_cypress() {
    if [ "$host" = 1 ]; then
        echo "Running headless Cypress e2e tests against local host: $1"
        read -p "Are you already serving the site locally? (Y/N): " alreadyServing
        if [ "$alreadyServing" = "y" ] || [ "$alreadyServing" = "Y"  ]; then
            if [ "$e2eTestType" = 1 ]; then
                npm run e2e
            else
                npm run e2e-gui
            fi
        else
            if [ "$e2eTestType" = 1 ]; then
                npm run e2e-serve
            else
                npm run e2e-serve-gui
            fi

        fi
    else
        echo "Running headless Cypress e2e tests against sandbox: $1"
        if [ "$e2eTestType" = 1 ]; then
            CYPRESS_BASE_URL="$1" npm run e2e
        else
            CYPRESS_BASE_URL="$1" npm run e2e-gui
        fi
    fi
}

run_cypress ${host_urls[$host]}