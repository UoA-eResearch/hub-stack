# ResearchHub SubHub Internal Pages Link-Checking App

Contentful App Framework app for ensuring pages on ResearchHub are only linked to by _one_ SubHub internal pages field.

The App is a replacement editor for the [default reference field editor](https://www.contentful.com/developers/docs/extensibility/field-editors/).
The replacement editor behaves and looks the same as the built-in one. To use it, set it up as the editor for the Internal Pages field in the Content model details page.
It checks whether the pages that the author wishes to add to the Internal Pages field already belong to another SubHub's Internal Pages field. If so, it will
display an error. If not, it will add the pages to the field.

Written with React/TypeScript/Contentful App Framework.

Part of the Hub Expansion project. This is required due to SubHub routing logic in the frontend.

There are three instances of the Contentful App - one for dev, test and prod. [Read more...](https://www.contentful.com/developers/docs/extensibility/app-framework/)

## Seeing and deploying your changes
This assumes the Contentful environments are set up with the required app definitions. See the First time deployment section if you need to redo those steps.

ResearchHub has three Contentful environments - `dev`, `test`, and `prod`, and `prod` is the one content authors see. Use `dev` for previewing your changes and manual testing - Contentful Apps can't be run locally. Deployment to `test` and `prod` should only be done as part of [the official release process](https://wiki.auckland.ac.nz/display/APPLCTN/Release+to+prod) and content authors need to be notified before deploying updates.

1. If you are deploying to `test` and `prod`, first check-in your changes to Git and merge them into `master`.
1. Run `npm run build` to build a new bundle.
2. Run `npm run upload`.
    1. For the bundle comment, put in the hash of Git commit you built the bundle from if applicable.
    2. Follow on-screen instructions to paste in your access token.
    3. Choose your organisation (should be University of Auckland.)
    4. Choose the app definition you want to upload to - the name should match the environment you're deploying to.
3. Go to Contentful to see your changes.

## First time deployment

1. Create three Apps on Contentful. In the `subhub-link-checker` folder, run the command:

    ```
    npx @contentful/create-contentful-app create-definition
    ```

    When prompted, enter the app name "SubHub Link Checker - dev". In the next step, select "Entry field" and "Page" as locations where the app can be rendered. Then in the next step, select "Entry reference" and "Entry reference, list". The command will open a browser to ask you to log in to Contentful. Paste the resulting token into the command.

    The App is now available in your Contentful space. Log in to Contentful, click Apps > Manage Apps, and notice "SubHub Link Checker - dev" is listed as an available app.

    Repeat this process with the names "SubHub Link Checker - test" and "SubHub Link Checker - prod" to create an instance for the other Contentful environments. This way each environment has a separate instance, and you can promote changes through the environments.


2. Upload the App.
    ```
    cd subhub-link-checker
    npm install
    npm run upload
    ```
    This will build and deploy the App to Contentful. Follow the instructions onscreen
    to log in and select the appropriate App instance.

3. Install the App in space and use the App for the Internal Pages field
    
    Click on the App and press Authorize access. The App should now be listed as installed.

    Click on Content model tab, then the model for SubHubs (currently titled `Page > SubHub`). Find and click on the field for internal pages (currently titled `Internal Pages`). In the Appearance tab, select the SubHub Link Checker option and Save.

    Open a SubHub to verify the Internal Pages field is still editable. If it is, then the App setup is complete!

## Development
This project was bootstrapped with [Create Contentful App](https://github.com/contentful/create-contentful-app).

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in contentful, and runs the app in development mode.
Open your app to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Libraries to use

To make your app look and feel like Contentful use the following libraries:

- [Forma 36](https://f36.contentful.com/) – Contentful's design system
- [Contentful Field Editors](https://www.contentful.com/developers/docs/extensibility/field-editors/) – Contentful's field editor React components

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.
