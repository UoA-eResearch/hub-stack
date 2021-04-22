# HubSearchProxy
* AWS Serverless (Lambda) function that interacts with ResearchHub's ElasticSearch instance 
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
3. Obtain Temporary AWS credentials for UoA (**Note:** only valid for 1 hour):
Running and testing locally will not succeed without AWS credentials. Instructions for accessing the credentials are on the [Auckland Uni wiki](https://wiki.auckland.ac.nz/pages/viewpage.action?spaceKey=UC&title=AWS+Temporary+Credentials+for+CLI).

* Generated credentials are located in ~/.aws/credentials. Take note of the profile name for the credentials. Currently "saml" is the default profile at the time of writing this.
* Passing in the aws credentials to the deploy and test commands can be done by adding arguments after a double dash to the run/test commands. This applies to any npm command.
e.g.
* Deploying with the default sandbox stage and saml profile:
`npm run deploy -- --aws-profile saml`

## Run locally
To run locally simply execute:
```
npm start -- --aws-profile <profile> --stage <stage>
```

## Debug Locally
Inside Visual Studio Code hit `F5` and select `Debug` as config file. Attach breakpoints as desired.

## Test
To run all unit tests once simply execute:

```
npm test -- --aws-profile <profile> --stage <stage>
```

### Test and watch for changes
To run all unit tests and have them watch your files for changes:

```
npm run testw -- --aws-profile <profile> --stage <stage>
```

## Deploy to AWS
To deploy to AWS execute:
* By default it deploys to the `dev` stage if you don't provide a stage parameter
```
npm deploy -- --aws-profile <profile> --stage <stage>
```

## Get info about existing deployment
To get information about the currently deployed endpoints, region, stage, layers and other things, execute:

```
sls info
```

For info on a specific stage, and AWS account profile, use the profile and stage flags. e.g.:

```
sls info --stage test --aws-profile uoa-its-nonprod
```

## Invoke a deployed Lambda function running on AWS

```
sls invoke -f hub-search-proxy
```

## Resources
* For general Serverless Framework help run: `sls help`
* [Serverless Mocha Plugin](https://www.npmjs.com/package/serverless-mocha-plugin)

# Local Development
* npm deploy and npm test will not run successfully without AWS credentials. These can be accessed on the Auckland Uni wiki [here](https://wiki.auckland.ac.nz/pages/viewpage.action?spaceKey=UC&title=AWS+Temporary+Credentials+for+CLI)
* Make sure that the credentials are located in `~/.aws/credentials` and take note of the profile for the credentials. Currently `saml` is the default profile at the time of writing this.
* If you wish to test with non-`dev` configurations you will also need to specify the ```--stage``` option as either `sandbox` (sandbox account), `dev`, `test` (nonprod account) or `prod` (prod account).
* Passing in the aws credentials to the deploy and test commands can be done by adding arguments after a double dash to the run/test commands. This applies to any npm command.
* Deploying with the default dev stage and saml profile:
```npm run deploy -- --aws-profile saml```
* Running tests with non-prod stage environment variables. ```npm run test -- --aws-profile saml --stage test```
  * Environmental variables can be set in ```env/``` which is used by serverless when deploying/testing lambda function.