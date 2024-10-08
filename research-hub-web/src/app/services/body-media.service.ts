import { Injectable, Type } from '@angular/core';
import { Block, BLOCKS, Inline, INLINES, MARKS } from '@contentful/rich-text-types';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';

/** Custom Rich Text Renderers */
import { BlocksQuoteComponent } from '@components/shared/body-media/blocks-quote/blocks-quote.component';
import { BlocksEmbeddedAssetComponent } from '@components/shared/body-media/blocks-embedded-asset/blocks-embedded-asset.component';
import { BlocksEmbeddedEntryComponent } from '@components/shared/body-media/blocks-embedded-entry/blocks-embedded-entry.component';
import { InlinesAssetHyperlinkComponent } from '@components/shared/body-media/inlines-asset-hyperlink/inlines-asset-hyperlink.component';
import { InlinesEmbeddedEntryComponent } from '@components/shared/body-media/inlines-embedded-entry/inlines-embedded-entry.component';
import { InlinesEntryHyperlinkComponent } from '@components/shared/body-media/inlines-entry-hyperlink/inlines-entry-hyperlink.component';
import { MarksCodeComponent } from '@components/shared/body-media/marks-code/marks-code.component';
import { ProcessBodyTextLinks, ArticleBodyTextLinks, Asset, CapabilityBodyTextLinks, CaseStudyBodyTextLinks, CaseStudyReferencesLinks, Entry, EquipmentBodyTextLinks, EventBodyTextLinks, ExpandBodyTextLinks, FundingBodyTextLinks, FundingDeadlinesLinks, FundingPurposeLinks, Maybe, ServiceBodyTextLinks, SoftwareBodyTextLinks, SubHubBodyTextLinks } from '@app/graphql/schema';

export type BodyTextLinks
  = ProcessBodyTextLinks
  | ArticleBodyTextLinks
  | CapabilityBodyTextLinks
  | SubHubBodyTextLinks
  | SoftwareBodyTextLinks
  | ServiceBodyTextLinks
  | FundingPurposeLinks
  | FundingDeadlinesLinks
  | FundingBodyTextLinks
  | EventBodyTextLinks
  | EquipmentBodyTextLinks
  | CaseStudyReferencesLinks
  | CaseStudyBodyTextLinks
  | ExpandBodyTextLinks

@Injectable({
  providedIn: 'root'
})
export class BodyMediaService {
  public nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BlocksQuoteComponent,
    [BLOCKS.EMBEDDED_ASSET]: BlocksEmbeddedAssetComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BlocksEmbeddedEntryComponent,
    [INLINES.ASSET_HYPERLINK]: InlinesAssetHyperlinkComponent,
    [INLINES.EMBEDDED_ENTRY]: InlinesEmbeddedEntryComponent,
    [INLINES.ENTRY_HYPERLINK]: InlinesEntryHyperlinkComponent,
  };
  public markRenderers: Record<string, Type<MarkRenderer>> = {
    [MARKS.CODE]: MarksCodeComponent
  };

  private assetBlockMap = new Map<string, Asset>();
  private assetHyperlinkMap = new Map<string, Asset>();
  private entryBlockMap = new Map<string, Entry>();
  private entryHyperlinkMap = new Map<string, Entry>();
  private entryInlineMap = new Map<string, Entry>();

  constructor() { }

  /**
   * create maps for each link type so it can be used by our custom rich text rendering components
   * (components that extend NodeRenderer) to lookup the corresponding content for a rich text node.
   * @param links
   */
  buildLinkMaps(links: BodyTextLinks | undefined | null) {
    if (links?.assets) {
      for (const asset of links.assets.block) {
        if (asset) this.assetBlockMap.set(asset.sys.id, asset);
      }
      for (const asset of links.assets.hyperlink) {
        if (asset) this.assetHyperlinkMap.set(asset.sys.id, asset);
      }
    }

    if (links?.entries) {
      for (const entry of links.entries.block) {
        if (entry) this.entryBlockMap.set(entry.sys.id, entry);
      }
      for (const entry of links.entries.inline) {
        if (entry) this.entryInlineMap.set(entry.sys.id, entry);
      }
      for (const entry of links.entries.hyperlink) {
        if (entry) this.entryHyperlinkMap.set(entry.sys.id, entry);
      }
    }
  }

  getContentItem(node: Block | Inline): Asset | Entry {
    let item: Asset | Entry | undefined;
    switch (node.nodeType) {
      // For each type of node find matching contentItem
      case 'embedded-asset-block':
        item = this.assetBlockMap.get(node.data.target.sys.id);
        break;
      case 'embedded-entry-block':
        item = this.entryBlockMap.get(node.data.target.sys.id);
        break;
      case 'embedded-entry-inline':
        item = this.entryInlineMap.get(node.data.target.sys.id);
        break;
      case 'entry-hyperlink':
        item = this.entryHyperlinkMap.get(node.data.target.sys.id);
        break;
      case 'asset-hyperlink':
        item = this.assetHyperlinkMap.get(node.data.target.sys.id);
        break;
    }

    if (!item) {
      throw new Error(`Did not find content item for node ${node.data.target.sys.id}`);
    } else {
      return item
    };
  }
}
