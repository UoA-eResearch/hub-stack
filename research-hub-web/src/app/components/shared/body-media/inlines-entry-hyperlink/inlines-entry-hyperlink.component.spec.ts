import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesEntryHyperlinkComponent } from './inlines-entry-hyperlink.component';

describe('InlinesEntryHyperlinkComponent', () => {
  let component: InlinesEntryHyperlinkComponent;
  let fixture: ComponentFixture<InlinesEntryHyperlinkComponent>;
  
  const node = {
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

  const links = {
    "entries": {
      "block": [],
      "inline": [],
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
      "block": [],
      "hyperlink": [],
      "__typename": "ArticleBodyTextAssets"
    },
    "__typename": "ArticleBodyTextLinks"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesEntryHyperlinkComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlinesEntryHyperlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = node;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
