import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES } from '@contentful/rich-text-types';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesEmbeddedEntryComponent } from './inlines-embedded-entry.component';

describe('InlinesEmbeddedEntryComponent', () => {
  let component: InlinesEmbeddedEntryComponent;
  let fixture: ComponentFixture<InlinesEmbeddedEntryComponent>;
  
  const node = {
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

  const links = {
    "entries": {
      "block": [],
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
      "hyperlink": [],
      "__typename": "ArticleBodyTextEntries"
    },
    "assets": {
      "block": [],
      "hyperlink": [],
      "__typename": "ArticleBodyTextAssets"
    },
    "__typename": "ArticleBodyTextLinks"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesEmbeddedEntryComponent ],
      imports: [ RouterTestingModule ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlinesEmbeddedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.node = node;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
