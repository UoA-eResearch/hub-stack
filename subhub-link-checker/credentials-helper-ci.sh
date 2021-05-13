#! /bin/bash
# File for retrieving Git username and password from Jenkins. Only applicable from CI server.
echo username=$GIT_CREDS_USR
echo password=$GIT_CREDS_PSW