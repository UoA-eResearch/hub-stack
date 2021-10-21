import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BlocksEmbeddedAssetComponent } from './blocks-embedded-asset.component';

describe('BlocksEmbeddedAssetComponent', () => {
  let component: BlocksEmbeddedAssetComponent;
  let fixture: ComponentFixture<BlocksEmbeddedAssetComponent>;
  
  const node = {
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

  const links = {
    "entries": {
      "block": [],
      "inline": [],
      "hyperlink": [],
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
      "hyperlink": [],
      "__typename": "ArticleBodyTextAssets"
    },
    "__typename": "ArticleBodyTextLinks"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksEmbeddedAssetComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksEmbeddedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = node;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
