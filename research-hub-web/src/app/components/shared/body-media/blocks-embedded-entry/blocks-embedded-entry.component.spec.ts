import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS } from '@contentful/rich-text-types';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { BlocksEmbeddedEntryComponent } from './blocks-embedded-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@components/shared/app.shared.module';
import { Entry } from '@app/graphql/schema';

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

  const contentItem = {
    "title": "Sherpa Romeo",
    "summary": "Online resource that provides summaries of publisher copyright and open access archiving policies on a journal-by-journal basis.",
    "url": "https://v2.sherpa.ac.uk/romeo/",
    "document": null,
    "__typename": "LinkCard",
    "sys": {
      "id": "53FJu74kjVsH21A0RU2nTH",
      "__typename": "Sys"
    }
  }

  MockInstance.scope();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksEmbeddedEntryComponent ],
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

    fixture = TestBed.createComponent(BlocksEmbeddedEntryComponent);
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
