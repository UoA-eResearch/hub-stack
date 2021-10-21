import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesAssetHyperlinkComponent } from './inlines-asset-hyperlink.component';

describe('InlinesAssetHyperlinkComponent', () => {
  let component: InlinesAssetHyperlinkComponent;
  let fixture: ComponentFixture<InlinesAssetHyperlinkComponent>;
  
  const node = {
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

  const links = {
    "entries": {
      "block": [],
      "inline": [],
      "hyperlink": [],
      "__typename": "ArticleBodyTextEntries"
    },
    "assets": {
      "block": [],
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesAssetHyperlinkComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlinesAssetHyperlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = node;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
