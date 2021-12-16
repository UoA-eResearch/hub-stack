import React from 'react';
import { render } from 'react-dom';

import {
  FieldExtensionSDK,
  DialogExtensionSDK,
  PageExtensionSDK,
  init,
  locations,
} from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-tokens/dist/css/index.css';
import './index.css';

import Page from './components/Page';
import Field from './components/Field';
import Dialog from './components/Dialog';

import LocalhostWarning from './components/LocalhostWarning';

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  const root = document.getElementById('root');
  render(<LocalhostWarning />, root);
} else {
  init((sdk) => {
    const root = document.getElementById('root');

    // All possible locations for your app
    // Feel free to remove unused locations
    // Dont forget to delete the file too :)
    const ComponentLocationSettings = [
      {
        location: locations.LOCATION_ENTRY_FIELD,
        component: <Field sdk={sdk as FieldExtensionSDK} />,
      },
      {
        location: locations.LOCATION_DIALOG,
        component: <Dialog sdk={sdk as DialogExtensionSDK} />,
      },
      {
        location: locations.LOCATION_PAGE,
        component: <Page sdk={sdk as PageExtensionSDK} />,
      },
    ];

    // Select a component depending on a location in which the app is rendered.
    ComponentLocationSettings.forEach((componentLocationSetting) => {
      if (sdk.location.is(componentLocationSetting.location)) {
        render(componentLocationSetting.component, root);
      }
    });
  });
}
