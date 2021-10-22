import { TestBed } from '@angular/core/testing';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { BodyMediaService } from './body-media.service';

describe('BodyMediaService', () => {
  let service: BodyMediaService;

  const links = {
    "entries": {
      "block": [{
        "title": "Sherpa Romeo",
        "summary": "Online resource that provides summaries of publisher copyright and open access archiving policies on a journal-by-journal basis.",
        "url": "https://v2.sherpa.ac.uk/romeo/",
        "document": null,
        "__typename": "LinkCard",
        "sys": {
          "id": "53FJu74kjVsH21A0RU2nTH",
          "__typename": "Sys"
        }
      }],
      "inline": [{
        "__typename": "Service",
        "icon": null,
        "slug": "researchspace",
        "title": "ResearchSpace: The University of Auckland Research Repository",
        "summary": "The University of Auckland Research Repository is an online open access archive for the University of Auckland. It contains the research outputs of University of Auckland staff and postgraduate research students, including full text theses.",
        "ssoProtected": false,
        "searchable": true,
        "sys": {
          "id": "51CsS9cFmuRN2s0wOcWuuF",
          "__typename": "Sys"
        }
      }],
      "hyperlink": [{
        "__typename": "Event",
        "icon": null,
        "slug": "abstract-writing",
        "title": "Abstract writing",
        "summary": "Learn how to write an effective abstract for conferences, events and publications.",
        "banner": {
          "url": "https://images.ctfassets.net/vbuxn5csp0ik/2jexqL203EBahwKg3o5dwF/c1ef0120b72788c164f31344ec6191a4/abstract-writing.jpg",
          "__typename": "Asset"
        },
        "ssoProtected": false,
        "searchable": true,
        "sys": {
          "id": "64qNrnSsvnM8ixdxOkUF4y",
          "__typename": "Sys"
        }
      }],
      "__typename": "ArticleBodyTextEntries"
    },
    "assets": {
      "block": [{
        "sys": {
          "id": "2hQxPdQ5m0ezjjQ7jJibHw",
          "__typename": "Sys"
        },
        "title": "FAIR and CARE Principles image",
        "description": "Image for the FAIR and CARE principles for research data",
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/2hQxPdQ5m0ezjjQ7jJibHw/3545283a16312f6b9fbdc8e4ec7e1367/FAIR-CARE-principles.png",
        "size": 840711,
        "contentType": "image/png",
        "__typename": "Asset"
      }],
      "hyperlink": [{
        "sys": {
          "id": "5IfxoF4WQ4Ks71q2HeLbgC",
          "__typename": "Sys"
        },
        "title": "Light Background",
        "description": "Homepage Image",
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/5IfxoF4WQ4Ks71q2HeLbgC/dbcc0df7c1ef3cf813ecc1d9bbfb384e/ClockTowerint.jpg",
        "size": 1917128,
        "contentType": "image/jpeg",
        "__typename": "Asset"
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
    expect(contentItem.sys.id).toBe(embeddedAssetNode.data.target.sys.id);
  });

  it('should fetch an embedded-entry-block', () => {
    const contentItem = service.getContentItem(embeddedEntryNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem.sys.id).toBe(embeddedEntryNode.data.target.sys.id);
  });

  it('should fetch an embedded-entry-inline', () => {
    const contentItem = service.getContentItem(embeddedEntryInlineNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem.sys.id).toBe(embeddedEntryInlineNode.data.target.sys.id);
  });

  it('should fetch an entry-hyperlink', () => {
    const contentItem = service.getContentItem(entryHyperlinkNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem.sys.id).toBe(entryHyperlinkNode.data.target.sys.id);
  });

  it('should fetch an asset-hyperlink', () => {
    const contentItem = service.getContentItem(assetHyperlinkNode);
    expect(contentItem).toBeTruthy();
    expect(contentItem.sys.id).toBe(assetHyperlinkNode.data.target.sys.id);
  });
});
