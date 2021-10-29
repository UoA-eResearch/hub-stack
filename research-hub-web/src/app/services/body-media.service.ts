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
import { ArticleBodyTextLinks, Asset, CaseStudyBodyTextLinks, CaseStudyReferencesLinks, Entry, EquipmentBodyTextLinks, EventBodyTextLinks, FundingBodyTextLinks, FundingDeadlinesLinks, FundingPurposeLinks, ServiceBodyTextLinks, SoftwareBodyTextLinks, SubHubBodyTextLinks } from '@app/graphql/schema';

export type BodyTextLinks
  = ArticleBodyTextLinks
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
  buildLinkMaps(links: BodyTextLinks) {
    if (links.assets) {
      for (const asset of links.assets.block) {
        this.assetBlockMap.set(asset.sys.id, asset);
      }
      for (const asset of links.assets.hyperlink) {
        this.assetHyperlinkMap.set(asset.sys.id, asset);
      }
    }

    if (links.entries) {
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

  getContentItem(node: Block | Inline): Asset | Entry {
    switch (node.nodeType) {
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
