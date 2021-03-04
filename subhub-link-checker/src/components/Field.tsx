import React, { useEffect } from 'react';
import { CollectionResponse, EntrySys, FieldExtensionSDK } from '@contentful/app-sdk';
import { CombinedLinkActions, MultipleEntryReferenceEditor } from '@contentful/field-editor-reference';
import { Entry } from '@contentful/field-editor-reference/dist/types';
import { LinkActionsProps } from '@contentful/field-editor-reference/dist/components';
import "./Field.css";

interface FieldProps {
  sdk: FieldExtensionSDK;
}

function checkPageReferences(sdk: FieldExtensionSDK, subhubSys: EntrySys, pageSys: EntrySys): Promise<Boolean> {
  console.log(`Checking page reference for subhub ${subhubSys.id} and page ${pageSys.id}`);
  // First, check if the content author is trying to link a subhub to itself.
  if (subhubSys.type === pageSys.type && subhubSys.id === pageSys.id) {
    console.log("Subhub and page are the same, rejecting.");
    return Promise.resolve(false);
  }
  // Fetch other subhubs that have links to this page.
  return sdk.space.getEntries({
    "content_type": "subHub",
    "fields.internalPages.sys.id": pageSys.id,
    "sys.id[ne]": subhubSys.id
  }).then((entries: CollectionResponse<Object>) => {
    console.log(`Found ${entries.items.length} other Subhub(s) that contain this page.`);
    if (entries.items.length > 0) {
      console.log("Other SubHub(s) containing this page",entries.items);
    }
    return entries.items.length === 0;
  });
}

const doFailedAlertDialog = (sdk: FieldExtensionSDK, hasMultiplePages: boolean, failedPageNames : string[]) => {
  const page = hasMultiplePages ? "pages" : "page";
  const failedPage = failedPageNames.length > 1 ? "these pages" : "this page";
  const failedPageList = failedPageNames.map(name => "\"" + name + "\"").join(", ");
  const paragraphBeginning = hasMultiplePages ? "Some of the existing pages" : "The existing page";
  const nextStep = hasMultiplePages ? `Try adding ${failedPage} to the External Pages field instead: ${failedPageList}.` : "Try adding the page to the External Pages field instead."
  sdk.dialogs.openAlert({
    title: `Adding existing ${page} in SubHub Internal Pages field failed`,
    message: `${paragraphBeginning} you added failed our link check. Pages may only be added to one SubHub's Internal Pages field, and SubHubs may not link to themselves. \
    The External Pages field does not have these limitations. ${nextStep}`
  });
};

/**
 * Determine and return all the content types accepted by the internalPages field.
 * @param sdk The field SDK
 */
const getContentTypesAcceptedByField = (sdk: FieldExtensionSDK) => {
  if (sdk.field.items && sdk.field.items.validations) {
    const contentTypeValidations = sdk.field.items.validations.filter(validation => validation.hasOwnProperty("linkContentType")) as Array<any>;
    return contentTypeValidations.flatMap(validation => validation.linkContentType || []);
  } else {
    return []; // By default, all content types should be allowable in this collection.
  }

};

interface CustomLinkActionsProps {
  inheritedProps: LinkActionsProps,
  sdk: FieldExtensionSDK
};

const CustomLinkActions = ({inheritedProps:props, sdk}: CustomLinkActionsProps) => {
  const locale = sdk.locales.default;
  return <CombinedLinkActions
  {...props}
  onLinkExisting={index => {
    // This callback is called when the user wants to "link" existing pages to the subhub's internalPages collection.
    const contentTypes = getContentTypesAcceptedByField(sdk);
    sdk.dialogs
      .selectMultipleEntries({
        locale: sdk.field.locale,
        contentTypes
      })
      .then((entries) => {
        if (!entries || entries.length === 0) {
          return;
        }
        // Check all entries are ok.
        const subhubSys = sdk.entry.getSys();
        return Promise.all(
          entries.map(entry => checkPageReferences(sdk, subhubSys, (entry as Entry).sys))
        ).then(results => {
          const failedEntries = entries.filter((entry, i) => !results[i]);
          if (failedEntries.length === 0) {
            // All OK! Will add all entries to entry list.
            props.onLinkedExisting(entries as Entry[], index);
            return;
          } else {
            // There were some pages that didn't pass the check. Do not allow them to be entered.
            const hasMultiplePages = entries.length !== 1;
            const failedPageNames = failedEntries.map(entry => {
              const title = (entry as Entry).fields.title;
              return title ? title[locale] : "(Untitled content)";
            });
            doFailedAlertDialog(sdk, hasMultiplePages, failedPageNames);
            return;
          }
        });
      }).catch(reason => {
        sdk.dialogs.openAlert({
          title: "Error occurred in the SubHub link-checking application",
          message: "Sorry, an error occurred while adding your page(s) to the SubHub Internal Pages field. " +
            "Please try again. If problems persist, please message the ResearchHub team for assistance."
        });
        console.log("Error occurred in SubHub link-checking application", reason);
      });
  }}
/>
};

const Field = ({ sdk }: FieldProps) => {
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    }
  }, [sdk.window]);
  return <MultipleEntryReferenceEditor
      viewType="link"
      hasCardEditActions={true}
      sdk={sdk}
      isInitiallyDisabled={true}
      parameters={{
        instance: {
          showCreateEntityAction: true,
          showLinkEntityAction: true,
        },
      }}
      renderCustomActions={
        props => <CustomLinkActions inheritedProps={props} sdk={sdk}/>
      }
    />;

};

export default Field;
