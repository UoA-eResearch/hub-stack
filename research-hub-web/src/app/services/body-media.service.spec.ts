import { TestBed } from '@angular/core/testing';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { BodyMediaService, BodyTextLinks } from './body-media.service';

describe('BodyMediaService', () => {
  let service: BodyMediaService;

  const links: BodyTextLinks = {
    "entries": {
      "block": [{
          contentfulMetadata: {
            tags: []
          },
          "sys": {
            "id": "53FJu74kjVsH21A0RU2nTH",
            "__typename": "Sys",
            environmentId: '',
            firstPublishedAt: '',
            publishedAt: '',
            publishedVersion: 0,
            spaceId: ''
        }
      }],
      "inline": [{
        contentfulMetadata: {
          tags: []
        },
        "sys": {
          "id": "51CsS9cFmuRN2s0wOcWuuF",
          "__typename": "Sys",
          environmentId: '',
          firstPublishedAt: '',
          publishedAt: '',
          publishedVersion: 0,
          spaceId: ''
        }
      }],
      "hyperlink": [{
        contentfulMetadata: {
          tags: []
        },
        "sys": {
          "id": "64qNrnSsvnM8ixdxOkUF4y",
          "__typename": "Sys",
          environmentId: '',
          firstPublishedAt: '',
          publishedAt: '',
          publishedVersion: 0,
          spaceId: ''
        }
      }],
      "__typename": "ArticleBodyTextEntries"
    },
    "assets": {
      "block": [{
        "sys": {
          "id": "2hQxPdQ5m0ezjjQ7jJibHw",
          "__typename": "Sys",
          environmentId: '',
          firstPublishedAt: '',
          publishedAt: '',
          publishedVersion: 0,
          spaceId: ''
        },
        "title": "FAIR and CARE Principles image",
        "description": "Image for the FAIR and CARE principles for research data",
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/2hQxPdQ5m0ezjjQ7jJibHw/3545283a16312f6b9fbdc8e4ec7e1367/FAIR-CARE-principles.png",
        "size": 840711,
        "contentType": "image/png",
        "__typename": "Asset",
        contentfulMetadata: {
          tags: []
        },
        fileName: '',
        height: 0,
        linkedFrom: null,
        width: 0
      }],
      "hyperlink": [{
        "sys": {
          "id": "5IfxoF4WQ4Ks71q2HeLbgC",
          "__typename": "Sys",
          environmentId: '',
          firstPublishedAt: '',
          publishedAt: '',
          publishedVersion: 0,
          spaceId: ''
        },
        "title": "Light Background",
        "description": "Homepage Image",
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/5IfxoF4WQ4Ks71q2HeLbgC/dbcc0df7c1ef3cf813ecc1d9bbfb384e/ClockTowerint.jpg",
        "size": 1917128,
        "contentType": "image/jpeg",
        "__typename": "Asset",
        contentfulMetadata: {
          tags: []
        },
        fileName: '',
        height: 0,
        linkedFrom: null,
        width: 0
      }],
      "__typename": "ArticleBodyTextAssets"
    },
    "__typename": "ArticleBodyTextLinks"
  };

  const embeddedAssetNode = {
    "nodeType": BLOCKS.EMBEDDED_ASSET,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "2hQxPdQ5m0ezjjQ7jJibHw",
          "type": "Link",
          "linkType": "Asset"
        }
      }
    }
  };

  const embeddedEntryNode = {
    "nodeType": BLOCKS.EMBEDDED_ENTRY,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "53FJu74kjVsH21A0RU2nTH",
          "type": "Link",
          "linkType": "Entry"
        }
      }
    }
  };

  const embeddedEntryInlineNode = {
    "nodeType": INLINES.EMBEDDED_ENTRY,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "51CsS9cFmuRN2s0wOcWuuF",
          "type": "Link",
          "linkType": "Entry"
        }
      }
    }
  };

  const entryHyperlinkNode = {
    "nodeType": INLINES.ENTRY_HYPERLINK,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "64qNrnSsvnM8ixdxOkUF4y",
          "type": "Link",
          "linkType": "Entry"
        }
      }
    }
  };

  const assetHyperlinkNode = {
    "nodeType": INLINES.ASSET_HYPERLINK,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "5IfxoF4WQ4Ks71q2HeLbgC",
          "type": "Link",
          "linkType": "Asset"
        }
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BodyMediaService] });
    service = TestBed.inject(BodyMediaService);
    service.buildLinkMaps(links);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch an embedded-asset-block', () => {
    const contentItem = service.getContentItem(embeddedAssetNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem?.sys.id).toBe(embeddedAssetNode.data.target.sys.id);
  });

  it('should fetch an embedded-entry-block', () => {
    const contentItem = service.getContentItem(embeddedEntryNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem?.sys.id).toBe(embeddedEntryNode.data.target.sys.id);
  });

  it('should fetch an embedded-entry-inline', () => {
    const contentItem = service.getContentItem(embeddedEntryInlineNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem?.sys.id).toBe(embeddedEntryInlineNode.data.target.sys.id);
  });

  it('should fetch an entry-hyperlink', () => {
    const contentItem = service.getContentItem(entryHyperlinkNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem?.sys.id).toBe(entryHyperlinkNode.data.target.sys.id);
  });

  it('should fetch an asset-hyperlink', () => {
    const contentItem = service.getContentItem(assetHyperlinkNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem?.sys.id).toBe(assetHyperlinkNode.data.target.sys.id);
  });
});
