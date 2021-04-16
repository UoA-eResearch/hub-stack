# ResearchHub SubHub Internal Pages Link-Checking App

Contentful App Framework app for ensuring pages on ResearchHub are only linked to by _one_ SubHub internal pages field.

The App is a replacement editor for the [default reference field editor](https://www.contentful.com/developers/docs/extensibility/field-editors/).
The replacement editor behaves and looks the same as the built-in one. To use it, set it up as the editor for the Internal Pages field in the Content model details page.
It checks whether the pages that the author wishes to add to the Internal Pages field already belong to another SubHub's Internal Pages field. If so, it will
display an error. If not, it will add the pages to the field.

Written with React/TypeScript/Contentful App Framework.

Part of the Hub Expansion project. This is required due to SubHub routing logic in the frontend.

The App is hosted on GitHub Pages, and deployed as an private App in Contentful. [Read more...](https://www.contentful.com/developers/docs/extensibility/app-framework/)
## First time deployment
1. Deploy the App to GitHub Pages. To deploy this App, clone the repository, then:
    ```
    cd subhub-link-checker
    npm install
    npm run deploy
    ```
    This will build and deploy the App to the gh-pages branch of the hub-stack monorepo. To change the deployment location, [edit the `homepage` field in the package.json file](https://create-react-app.dev/docs/deployment/#github-pages). 


2. Then, you need to register the App on Contentful. In the `subhub-link-checker` folder, run the command:

    ```
    npx @contentful/create-contentful-app create-definition
    ```

    When prompted, enter the app name "SubHub Link Checker". In the next step, select "Entry field" and "Page" as locations where the app can be rendered. Then in the next step, select "Entry reference" and "Entry reference, list". The command will open a browser to ask you to log in to Contentful. Paste the resulting token into the command.

    The App is now available in your Contentful space. Log in to Contentful, click Apps > Manage Apps, and notice "SubHub Link Checker" is listed as an available app.

3. Install the App in space and use the App for the Internal Pages field
    
    Click on the App and press Authorize access. The App should now be listed as installed.

    Click on Content model tab, then the model for SubHubs (currently titled `Page > SubHub`). Find and click on the field for internal pages (currently titled `Internal Pages`). In the Appearance tab, select the SubHub Link Checker option and Save.

    Open a SubHub to verify the Internal Pages field is still editable. If it is, then the App setup is complete!

Subsequent deployment is automated in the monorepo [Jenkinsfile](../Jenkinsfile). Run `npm run deploy` if you'd like to do an ad-hoc manual deployment.
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
