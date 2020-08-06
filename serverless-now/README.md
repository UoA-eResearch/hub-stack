# ServerlessNow
* AWS Serverless (Lambda) function that interacts with UoA ServiceNow
* Build using the [Serverless Framework](https://serverless.com/)
* Supports unit testing and debugging with Visual Studio Code

## Setup
1. Install [Serverless Framework](https://www.serverless.com/) globally
```
npm install -g serverless
```
2. Install `NPM` modules
```
npm install
```
3. [Obtain Temporary AWS credentials for UoA (**Note:** only valid for 1 hour)](https://wiki.auckland.ac.nz/pages/viewpage.action?spaceKey=UC&title=AWS+Temporary+Credentials+for+CLI)

## Run locally
To run the tests locally simply execute:
```
npm test
```

## Debug Locally
Inside Visual Studio Code hit `F5` and select `Debug` as config file. Attach breakpoints as desired.

## Test
To run all unit tests once simply execute:

```
npm test
```

### Test and watch for changes
To run all unit tests and have them watch your files for changes:

```
npm run testw
```

## Deploy to AWS
To deploy to AWS execute (**Note:** will only deploy after all unit tests have passed):

```
npm deploy
```

### Deploy to a different stage
* By default the above command deploys to the `sandbox` stage
* You can optionally pass a `-- --stage STAGE_NAME` flag (**Note:** the extra `--`)

```
npm run deploy -- --stage=test
```

## Get info about existing deployment
To get information about the currently deployed endpoints, region, stage, layers and other things, execute:

```
sls info
```

## Invoke a deployed Lambda function running on AWS

```
sls invoke -f serverless-now
```

## Resources
* For general Serverless Framework help run: `sls help`
* [Serverless Mocha Plugin](https://www.npmjs.com/package/serverless-mocha-plugin)

# Local Development
* npm deploy and npm test will not run successfully without AWS credentials. These can be accessed on the Auckland Uni wiki [here](https://wiki.auckland.ac.nz/pages/viewpage.action?spaceKey=UC&title=AWS+Temporary+Credentials+for+CLI)
* Make sure that the credentials are located in `~/.aws/credentials` and take note of the profile for the credentials. Currently `saml` is the default profile at the time of writing this.
* If you wish to test with non-`sandbox` configurations you will also need to specify the ```--stage``` option as either `sandbox`, `nonprod` or `prod`.
* Passing in the aws credentials to the deploy and test commands can be done by adding arguments after a double dash to the run/test commands. This applies to any npm command.
* Deploying with the default sandbox stage and saml profile:
```npm run deploy -- --aws-profile saml```
* Running tests with non-prod stage environment variables. ```npm run test -- --aws-profile saml --stage nonprod```
* Environmental variables can be set in ```env/``` which is used by serverless when deploying/testing lambda function.

## CI/CD Instructions for use by the Centre for eResearch
When updates to this sub-repo are pushed to the **sandbox**, **nonprod**, or **prod** branches Jenkins this triggers the UoA production [Jenkins server pipelines](../Jenkinsfile).
The Jenkins server uses the configurations set in the environment for setting up access to the AWS resources/accounts/tags as well as defining the serverless-now lambda as a resource on AWS.

## Integration Testing
Serverless-now integration tests require valid `OAuth` 2.0 `access tokens` to work. The current way to do this in a conveniently is to log into CeR's [Postman](https://www.postman.com/) account. The `Research Hub Serverless-Now` collection contains the integration tests. Usage for testing is as follows:

1. Right click the collection to edit the collection.
2. Go to the authorization tab.
3. Select get new access token.
4. Select request token. **(may need to enter in token renewal details in order for this to work).**
5. If you require credentials to renew the access token enter the following. Replace `sandbox` with the aws account you are using the lambda on.
5. Hover over the collection and click the arrow to run the collection's tests.