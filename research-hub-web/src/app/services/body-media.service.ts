import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {
  
  constructor() { }

  /**
   * The Rich Text field response from the Contentful GraphQL API is different than the Contentful Delivery API response.
   * It contains two top-level nodes; json (JSON structure of the Rich Text field) and links (all referenced assets/entries).
   * The references are not automatically resolved inside of the Rich Text JSON from the GraphQL API. 
   * 
   * This method resolves the links by merging them into the rich text json as a new field called 'contentItem'.
   * 
   * This subsequently enables the use of the ngx-contentful-rich-text library to render the rich text with our
   * custom components.
   * 
   * @param bodyText 
   * @returns the modified bodyText
   */
  resolveNodeData(bodyText): any {    
    // create maps for each link type
    const assetBlockMap = new Map();
    // loop through the assets blocks and add them to the map
    for (const asset of bodyText.links.assets.block) {
      assetBlockMap.set(asset.sys.id, asset);
    }

    const entryBlockMap = new Map();
    // loop through the entries blocks and add them to the map
    for (const entry of bodyText.links.entries.block) {
      entryBlockMap.set(entry.sys.id, entry);
    }

    const entryInlineMap = new Map();
    // loop through the entry inlines and add them to the map
    for (const entry of bodyText.links.entries.inline) {
      entryInlineMap.set(entry.sys.id, entry);
    }

    const entryHyperlinkMap = new Map();
    // loop through the entry hyperlinks and add them to the map
    for (const entry of bodyText.links.entries.hyperlink) {
      entryHyperlinkMap.set(entry.sys.id, entry);
    }

    const assetHyperlinkMap = new Map();
    // loop through the asset hyperlinks and add them to the map
    for (const asset of bodyText.links.assets.hyperlink) {
      assetHyperlinkMap.set(asset.sys.id, asset);
    }

    //populate the rich text nodes with the entries and assets data
    bodyText.json.content.forEach(node => {
      switch(node.nodeType) {
        // For each type of node, first filter out null values, then find matching node.
        case 'embedded-asset-block':
          node.data.target.contentItem = assetBlockMap.get(node.data.target.sys.id);
          break;
        case 'embedded-entry-block':
          node.data.target.contentItem = entryBlockMap.get(node.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          node.data.target.contentItem = entryInlineMap.get(node.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          node.data.target.contentItem = entryHyperlinkMap.get(node.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          node.data.target.contentItem = assetHyperlinkMap.get(node.data.target.sys.id);
          break;
        case 'blockquote':
          node.data.target.contentItem = node.content[0];
      }
    });

    return bodyText;
  }
}

