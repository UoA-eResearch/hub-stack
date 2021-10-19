import { Injectable } from '@angular/core';
import { NodeData } from '@contentful/rich-text-types';

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
   * @param richText 
   * @returns the modified richText
   */
  resolveNodeData(richText): any {
    // create maps for each link type
    const assetBlockMap = new Map(
      richText.links.assets?.block?.map((asset) => [asset.sys.id, asset])
    );

    const entryBlockMap = new Map(
      richText.links.entries?.block?.map((entry) => [entry.sys.id, entry])
    );

    const entryInlineMap = new Map(
      richText.links.entries?.inline?.map((entry) => [entry.sys.id, entry])
    );

    const entryHyperlinkMap = new Map(
      richText.links.entries?.hyperlink?.map((entry) => [entry.sys.id, entry])
    );
    
    const assetHyperlinkMap = new Map(
      richText.links.assets?.hyperlink?.map((asset) => [asset.sys.id, asset])
    );

    //populate the rich text nodes with the entries and assets data
    richText.json.content.forEach(node => {
      switch(node.nodeType) {
        // For each type of node find matching contentItem and assign to 
        case 'embedded-asset-block':
          node.data.contentItem = assetBlockMap.get(node.data.target.sys.id);
          break;
        case 'embedded-entry-block':
          node.data.contentItem = entryBlockMap.get(node.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          node.data.contentItem = entryInlineMap.get(node.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          node.data.contentItem = entryHyperlinkMap.get(node.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          node.data.contentItem = assetHyperlinkMap.get(node.data.target.sys.id);
          break;
      }
    });

    return richText;
  }
}

