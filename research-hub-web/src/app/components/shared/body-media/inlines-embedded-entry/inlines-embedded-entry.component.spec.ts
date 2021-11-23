import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES } from '@contentful/rich-text-types';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesEmbeddedEntryComponent } from './inlines-embedded-entry.component';
import { SharedModule } from '@components/shared/app.shared.module';

describe('InlinesEmbeddedEntryComponent', () => {
  let component: InlinesEmbeddedEntryComponent;
  let fixture: ComponentFixture<InlinesEmbeddedEntryComponent>;
  
  const node = {
    "nodeType": INLINES.EMBEDDED_ENTRY,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "HeKy7SqHliY1CaHSoYuX3",
          "type": "Link",
          "linkType": "Entry"
        }
      }
    }
  };

  const contentItem = {
    "__typename": "Service",
    "slug": "clinical-research-centre",
    "title": " Faculty of Medical and Health Sciences Clinical Research Centre",
    "summary": "These excellent facilities are available to staff and postgraduate students in the Faculty to carry out research involving human participants, as long as appropriate ethics approvals are in place.",
    "ssoProtected": false,
    "searchable": true,
    "sys": {
      "id": "HeKy7SqHliY1CaHSoYuX3",
      "__typename": "Sys"
    }
  }
  
  MockInstance.scope();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesEmbeddedEntryComponent ],
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

    fixture = TestBed.createComponent(InlinesEmbeddedEntryComponent);
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
