import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES, Text as richText } from '@contentful/rich-text-types';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesEntryHyperlinkComponent } from './inlines-entry-hyperlink.component';
import { SharedModule } from '../../app.shared.module';

describe('InlinesEntryHyperlinkComponent', () => {
  let component: InlinesEntryHyperlinkComponent;
  let fixture: ComponentFixture<InlinesEntryHyperlinkComponent>;
  
  const textNode: richText = {
		"nodeType": "text",
		"value": "Entry Hyperlink Test",
		"marks": [],
		"data": {}
	};

  const node = {
    "nodeType": INLINES.ENTRY_HYPERLINK,
    "content": [textNode],
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

  const contentItem = {
    "__typename": "Event",
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
  }

  MockInstance.scope();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesEntryHyperlinkComponent ],
      imports: [
        RouterTestingModule,
        MockModule(SharedModule)
      ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    MockInstance(BodyMediaService, (instance) => {
      instance.getContentItem = jasmine.createSpy().and.returnValue(contentItem);
    });

    fixture = TestBed.createComponent(InlinesEntryHyperlinkComponent);
    component = fixture.componentInstance;
    component.node = node;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call body media service', () => {
    expect(component.bodyMediaService.getContentItem).toHaveBeenCalled();
  });

  it('should have content item', () => {
    expect(component.contentItem).toBeTruthy();
  });

  afterAll(MockInstance.restore);
});
