import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyMediaService } from '@services/body-media.service';
import { MockModule, MockProvider } from 'ng-mocks';
import { SharedModule } from '@components/shared/app.shared.module';
import { ExpandablePagePartComponent } from './expandable-page-part.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { Expand } from '@app/graphql/schema';
import { of } from 'rxjs';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ExpandablePagePartComponent', () => {
  let component: ExpandablePagePartComponent;
  let fixture: ComponentFixture<ExpandablePagePartComponent>;
  let loader: HarnessLoader;

  const contentItem: Partial<Expand> = {
    "__typename": "Expand",
    "sys": {
      "id": "1NaeZx3cAryE4yv64fPCLI",
      "__typename": "Sys",
      "firstPublishedAt": "2021-11-04T20:34:58.953Z",
      "publishedAt": "2021-11-05T02:09:29.674Z",
      "publishedVersion": 31,
      "environmentId": "50e5cff2-6fd6-4817-a6d4-d9fe8a3766a7",
      "spaceId": "vbuxn5csp0ik"
    }
  };

  const expand: Expand = {
    "__typename": "Expand",
    contentfulMetadata: {
      tags: null
    },
    linkedFrom: null,
    "sys": {
      "id": "1NaeZx3cAryE4yv64fPCLI",
      environmentId: '',
      firstPublishedAt: '',
      publishedAt: '',
      publishedVersion: 0,
      spaceId: ''
    },
    "title": "Another one",
    "bodyText": {
      "json": {
        "nodeType": "document",
        "data": {},
        "content": [{
          "nodeType": "paragraph",
          "content": [{
            "nodeType": "text",
            "value": "Hello goodbye",
            "marks": [],
            "data": {}
          }],
          "data": {}
        }, {
          "nodeType": "paragraph",
          "content": [{
            "nodeType": "text",
            "value": "",
            "marks": [],
            "data": {}
          }],
          "data": {}
        }, {
          "nodeType": "paragraph",
          "content": [{
            "nodeType": "text",
            "value": "",
            "marks": [],
            "data": {}
          }, {
            "nodeType": "hyperlink",
            "content": [{
              "nodeType": "text",
              "value": "Google",
              "marks": [],
              "data": {}
            }],
            "data": {
              "uri": "https://www.google.co.nz/"
            }
          }, {
            "nodeType": "text",
            "value": "",
            "marks": [],
            "data": {}
          }],
          "data": {}
        }, {
          "nodeType": "paragraph",
          "content": [{
            "nodeType": "text",
            "value": "",
            "marks": [],
            "data": {}
          }],
          "data": {}
        }, {
          "nodeType": "embedded-asset-block",
          "content": [],
          "data": {
            "target": {
              "sys": {
                "id": "kgmCrfNzKK9JQggR6KTe4",
                "type": "Link",
                "linkType": "Asset"
              }
            }
          }
        }, {
          "nodeType": "paragraph",
          "content": [{
            "nodeType": "text",
            "value": "",
            "marks": [],
            "data": {}
          }],
          "data": {}
        }]
      },
      "links": {
        "entries": {
          "block": [],
          "inline": [],
          "hyperlink": [],
          "__typename": "ExpandBodyTextEntries"
        },
        "assets": {
          "block": [{
            "sys": {
              "id": "kgmCrfNzKK9JQggR6KTe4",
              "__typename": "Sys",
              environmentId: '',
              firstPublishedAt: '',
              publishedAt: '',
              publishedVersion: 0,
              spaceId: ''
            },
            contentfulMetadata: {
              tags: null
            },
            "title": "cartman svg",
            "description": "example svg image",
            "url": "https://images.ctfassets.net/vbuxn5csp0ik/kgmCrfNzKK9JQggR6KTe4/7493e9eb9ff9f8305f5ddd4801129bda/cartman.svg",
            "size": 1148,
            "contentType": "image/svg+xml",
            "__typename": "Asset",
            fileName: '',
            height: 0,
            linkedFrom: null,
            width: 0
          }],
          "hyperlink": [],
          "__typename": "ExpandBodyTextAssets"
        },
        "__typename": "ExpandBodyTextLinks"
      },
      "__typename": "ExpandBodyText"
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandablePagePartComponent ],
      imports: [
        MockModule(SharedModule),
        ApolloTestingModule
      ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ExpandablePagePartComponent);
    component = fixture.componentInstance;
    component.contentItem = contentItem;
    await fixture.whenStable();
    component.expandPart$ = of(expand);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to load expansion panels', async () => {
    component.expandPart$.subscribe(async () => {
      const panels = await loader.getAllHarnesses<MatExpansionPanelHarness>(MatExpansionPanelHarness);
      expect(panels.length).toBe(1);
    });    
  });

  it('should be able to toggle expansion state of panel', async () => {
    component.expandPart$.subscribe(async () => {
      const panel = await loader.getHarness<MatExpansionPanelHarness>(MatExpansionPanelHarness.with({selector: '.mat-expansion-panel'}));
      expect(await panel.isExpanded()).toBe(false);
      await panel.toggle();
      expect(await panel.isExpanded()).toBe(true);
    });
  });

  it('should have the correct title in the expansion panel', async () => {
    component.expandPart$.subscribe(async () => {
      const panel = await loader.getHarness(MatExpansionPanelHarness);
      const title = await panel.getTitle();
      console.log(title);
      expect(title).toBe(expand.title);
    });
  });

  it('should generate the summary text from json input', async () => {
    component.expandPart$.subscribe(async () => {
      const summary = component.getSummaryText(expand.bodyText.json);    
      expect(summary).toContain(expand.bodyText.json.content[0].content[0].value);
    });
  });

  it('should get the summary text and show it in the expansion panel', async () => {
    component.expandPart$.subscribe(async () => {
      const panel = await loader.getHarness(MatExpansionPanelHarness);
      const summary = await panel.getDescription();      
      expect(summary).toBe(expand.bodyText.json);
    });
  });

  it('should be able to render the rich text content in the expansion panel body', async () => {
    component.expandPart$.subscribe(async () => {
      const panel = await loader.getHarness(MatExpansionPanelHarness);
      expect(await panel.getTextContent()).toContain(expand.bodyText.json.content[0].content[0].value);
    });
  });
});
