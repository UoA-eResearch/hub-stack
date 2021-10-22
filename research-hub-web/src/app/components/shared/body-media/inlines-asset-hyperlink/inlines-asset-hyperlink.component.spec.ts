import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { INLINES, Text as richText } from '@contentful/rich-text-types';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { InlinesAssetHyperlinkComponent } from './inlines-asset-hyperlink.component';
import { SharedModule } from '@components/shared/app.shared.module';

describe('InlinesAssetHyperlinkComponent', () => {
  let component: InlinesAssetHyperlinkComponent;
  let fixture: ComponentFixture<InlinesAssetHyperlinkComponent>;
  
  const textNode: richText = {
		"nodeType": "text",
		"value": "Asset Hyperlink Test",
		"marks": [],
		"data": {}
	};

  const node = {
    "nodeType": INLINES.ASSET_HYPERLINK,
    "content": [textNode],
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

  const contentItem = {
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
  };

  MockInstance.scope();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesAssetHyperlinkComponent ],
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

    fixture = TestBed.createComponent(InlinesAssetHyperlinkComponent);
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
