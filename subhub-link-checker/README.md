# ResearchHub SubHub Internal Pages Link-Checking App

Contentful App for ensuring pages on ResearchHub are only linked to by _one_ SubHub internal pages field.

React/TypeScript/Contentful App SDK

The App is a replacement editor for the [default reference field editor](https://www.contentful.com/developers/docs/extensibility/field-editors/).
The replacement editor behaves and looks the same as the built-in one. To use it, set it up as the editor for the Internal Pages field in the Content model details page.
It checks whether the pages that the author wishes to add to the Internal Pages field already belong to another SubHub's Internal Pages field. If so, it will
display an error. If not, it will add the pages to the field.

Part of the Hub Expansion project. This is required due to SubHub routing logic in the frontend.

See [hub-stack](https://github.com/UoA-eResearch/hub-stack) for more information on ResearchHub.

## Deployment
To deploy this App to a Contentful environment.

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
