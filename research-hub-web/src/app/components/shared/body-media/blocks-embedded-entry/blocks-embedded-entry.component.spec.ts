import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { BlocksEmbeddedEntryComponent } from './blocks-embedded-entry.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlocksEmbeddedEntryComponent', () => {
  let component: BlocksEmbeddedEntryComponent;
  let fixture: ComponentFixture<BlocksEmbeddedEntryComponent>;
  
  const node = {
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
      "inline": [],
      "hyperlink": [],
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
      declarations: [ BlocksEmbeddedEntryComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksEmbeddedEntryComponent);
    component = fixture.componentInstance;
    component.node = node;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
