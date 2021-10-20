import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {
  private assetBlockMap = new Map();
  private assetHyperlinkMap = new Map();
  private entryBlockMap = new Map();
  private entryHyperlinkMap = new Map();
  private entryInlineMap = new Map();
  
  constructor() { }
  
  /**
   * create maps for each link type so it can be used by our custom rich text rendering components
   * (components that extend NodeRenderer) to lookup the corresponding content for a rich text node.
   * @param links 
   */
  buildLinkMaps(links) {
    if(links.assets) {
      for (const asset of links.assets.block) {
        this.assetBlockMap.set(asset.sys.id, asset);
      }
      for (const asset of links.assets.hyperlink) {
        this.assetHyperlinkMap.set(asset.sys.id, asset);
      }
    }

    if(links.entries) {
      for (const entry of links.entries.block) {
        this.entryBlockMap.set(entry.sys.id, entry);
      }
      for (const entry of links.entries.inline) {
        this.entryInlineMap.set(entry.sys.id, entry);
      }
      for (const entry of links.entries.hyperlink) {
        this.entryHyperlinkMap.set(entry.sys.id, entry);
      }
    }
  }

  getContentItem(node): any {
    switch(node.nodeType) {
      // For each type of node find matching contentItem
      case 'embedded-asset-block':
        return this.assetBlockMap.get(node.data.target.sys.id);
      case 'embedded-entry-block':
        return this.entryBlockMap.get(node.data.target.sys.id);
      case 'embedded-entry-inline':
        return this.entryInlineMap.get(node.data.target.sys.id);
      case 'entry-hyperlink':
        return this.entryHyperlinkMap.get(node.data.target.sys.id);
      case 'asset-hyperlink':
        return this.assetHyperlinkMap.get(node.data.target.sys.id);
    }
  }
}
