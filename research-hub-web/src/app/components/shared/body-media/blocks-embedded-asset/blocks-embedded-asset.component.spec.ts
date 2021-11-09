import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { BLOCKS } from '@contentful/rich-text-types';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BlocksEmbeddedAssetComponent } from './blocks-embedded-asset.component';
import { SharedModule } from '@components/shared/app.shared.module';

describe('BlocksEmbeddedAssetComponent', () => {
  let component: BlocksEmbeddedAssetComponent;
  let fixture: ComponentFixture<BlocksEmbeddedAssetComponent>;
  
  const node = {
    "nodeType": BLOCKS.EMBEDDED_ASSET,
    "content": [],
    "data": {
      "target": {
        "sys": {
          "id": "4phY4n5e1VwDeepvnsaokh",
          "type": "Link",
          "linkType": "Asset"
        }
      }
    }
  };

  const contentItem = {
    "sys": {
      "id": "4phY4n5e1VwDeepvnsaokh",
      "__typename": "Sys"
    },
    "title": "ORCID",
    "description": null,
    "url": "https://images.ctfassets.net/vbuxn5csp0ik/4phY4n5e1VwDeepvnsaokh/795581a0d9659a4ae9575cd60201cac3/ORCID.jpg",
    "size": 164757,
    "contentType": "image/jpeg",
    "__typename": "Asset"
  }
  
  MockInstance.scope();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksEmbeddedAssetComponent ],
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

    fixture = TestBed.createComponent(BlocksEmbeddedAssetComponent);
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
