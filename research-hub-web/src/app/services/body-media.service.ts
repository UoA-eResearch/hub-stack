import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  
  buildLinkMaps(links) {
    console.log(links)

    // create maps for each link type
    if(links.assets) {
      for (const asset of links.assets.block) {
        this.assetBlockMap.set(asset.sys.id, asset);
      }
      console.log(this.assetBlockMap)
      for (const asset of links.assets.hyperlink) {
        this.assetHyperlinkMap.set(asset.sys.id, asset);
      }
      console.log(this.assetHyperlinkMap)
    }

    if(links.entries) {
      for (const entry of links.entries.block) {
        this.entryBlockMap.set(entry.sys.id, entry);
      }
      console.log(this.entryBlockMap)
      for (const entry of links.entries.inline) {
        this.entryInlineMap.set(entry.sys.id, entry);
      }
      console.log(this.entryInlineMap)
      for (const entry of links.entries.hyperlink) {
        this.entryHyperlinkMap.set(entry.sys.id, entry);
      }
      console.log(this.entryHyperlinkMap)
    }    
  }

  getContentItem(node): any {
    switch(node.nodeType) {
      // For each type of node find matching contentItem
      case 'embedded-asset-block':
        console.log(this.assetBlockMap)
        return this.assetBlockMap.get(node.data.target.sys.id);
      case 'embedded-entry-block':
        console.log(this.entryBlockMap)
        return this.entryBlockMap.get(node.data.target.sys.id);
      case 'embedded-entry-inline':
        console.log(this.entryInlineMap)
        return this.entryInlineMap.get(node.data.target.sys.id);
      case 'entry-hyperlink':
        console.log(this.entryHyperlinkMap)
        return this.entryHyperlinkMap.get(node.data.target.sys.id);
      case 'asset-hyperlink':
        console.log(this.assetHyperlinkMap)
        return this.assetHyperlinkMap.get(node.data.target.sys.id);
    }
  }
}
