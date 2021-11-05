import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BLOCKS } from '@contentful/rich-text-types';
import { BodyMediaService } from '@services/body-media.service';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { SharedModule } from '@components/shared/app.shared.module';
import { ExpandablePagePartComponent } from './expandable-page-part.component';
import { Expand } from '@app/graphql/schema';
import { of } from 'rxjs';

describe('ExpandablePagePartComponent', () => {
  let component: ExpandablePagePartComponent;
  let fixture: ComponentFixture<ExpandablePagePartComponent>;

  const contentItem: Partial<Expand> = {
    "__typename": "Expand",
    "sys": {
      "id": "3sOzm7PRhsgcGibaW73EXN",
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
    "sys": {
      "id": "6APvPP2BS14f0hESxykaWH",
      environmentId: '',
      firstPublishedAt: '',
      publishedAt: '',
      publishedVersion: 0,
      spaceId: ''
    },
    "title": "This One Has an Embedded Entry",
    "bodyText": {
      "json": {
        "nodeType": "document",
        "data": {},
        "content": [
          {
            "nodeType": "embedded-entry-block",
            "content": [],
            "data": {
              "target": {
                "sys": {
                  "id": "13f96FJpnt90ZxKevajrYc",
                  "type": "Link",
                  "linkType": "Entry"
                }
              }
            }
          },
          {
            "nodeType": "paragraph",
            "content": [
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              },
              {
                "nodeType": "entry-hyperlink",
                "content": [
                  {
                    "nodeType": "text",
                    "value": "Hello",
                    "marks": [],
                    "data": {}
                  }
                ],
                "data": {
                  "target": {
                    "sys": {
                      "id": "2j65Qc0sdHgpwaufz5BpuI",
                      "type": "Link",
                      "linkType": "Entry"
                    }
                  }
                }
              },
              {
                "nodeType": "text",
                "value": " this is a ",
                "marks": [],
                "data": {}
              },
              {
                "nodeType": "hyperlink",
                "content": [
                  {
                    "nodeType": "text",
                    "value": "Test",
                    "marks": [],
                    "data": {}
                  }
                ],
                "data": {
                  "uri": "https://www.google.co.nz/"
                }
              },
              {
                "nodeType": "text",
                "value": " with some different types of ",
                "marks": [],
                "data": {}
              },
              {
                "nodeType": "asset-hyperlink",
                "content": [
                  {
                    "nodeType": "text",
                    "value": "hyperlinks",
                    "marks": [],
                    "data": {}
                  }
                ],
                "data": {
                  "target": {
                    "sys": {
                      "id": "kgmCrfNzKK9JQggR6KTe4",
                      "type": "Link",
                      "linkType": "Asset"
                    }
                  }
                }
              },
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              }
            ],
            "data": {}
          },
          {
            "nodeType": "paragraph",
            "content": [
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              },
              {
                "nodeType": "embedded-entry-inline",
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
              },
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              }
            ],
            "data": {}
          },
          {
            "nodeType": "paragraph",
            "content": [
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              }
            ],
            "data": {}
          },
          {
            "nodeType": "paragraph",
            "content": [
              {
                "nodeType": "text",
                "value": "",
                "marks": [],
                "data": {}
              }
            ],
            "data": {}
          }
        ]
      },
      "links": {
        "entries": {
          "block": [
            {
              "__typename": "SubHub",
              "icon": null,
              "slug": "research-project-management",
              "title": "Research Project Management",
              "summary": "Information to support you to apply for funding and administer your research or consulting project.",
              "ssoProtected": true,
              "searchable": true,
              "banner": {
                "url": "https://images.ctfassets.net/vbuxn5csp0ik/6ptQXwqRlJ8aeXzeIzy8aE/a07ea4f817c89aebaa83b840f1e8f68e/Lightbulb.jpg"
              },
              "sys": {
                "id": "13f96FJpnt90ZxKevajrYc",
                environmentId: '',
                firstPublishedAt: '',
                publishedAt: '',
                publishedVersion: 0,
                spaceId: ''
              }
            }
          ],
          "inline": [
            {
              "__typename": "Service",
              "icon": null,
              "banner": {
                "url": "https://images.ctfassets.net/vbuxn5csp0ik/44602cmh1g9Hs57cAr03u6/5d3cc5f6394f89c6daad29ec749f5af4/r_DSC07102_full_size.jpg"
              },
              "slug": "clinical-research-centre",
              "title": " Faculty of Medical and Health Sciences Clinical Research Centre",
              "summary": "These excellent facilities are available to staff and postgraduate students in the Faculty to carry out research involving human participants, as long as appropriate ethics approvals are in place.",
              "ssoProtected": false,
              "searchable": true,
              "sys": {
                "id": "HeKy7SqHliY1CaHSoYuX3",
                environmentId: '',
                firstPublishedAt: '',
                publishedAt: '',
                publishedVersion: 0,
                spaceId: ''
              }
            }
          ],
          "hyperlink": [
            {
              "__typename": "Article",
              "icon": null,
              "slug": "contracts-and-clauses",
              "title": " Contracts and clauses",
              "summary": "Contract negotiation at UniServices is managed by the Contracts Management Team, who each look after a portfolio of departments and schools within a Faculty.",
              "ssoProtected": true,
              "searchable": true,
              "banner": null,
              "sys": {
                "id": "2j65Qc0sdHgpwaufz5BpuI",
                environmentId: '',
                firstPublishedAt: '',
                publishedAt: '',
                publishedVersion: 0,
                spaceId: ''
              }
            }
          ]
        },
        "assets": {
          "block": [],
          "hyperlink": [
            {
              "sys": {
                "id": "kgmCrfNzKK9JQggR6KTe4",
                environmentId: '',
                firstPublishedAt: '',
                publishedAt: '',
                publishedVersion: 0,
                spaceId: ''
              },
              "title": "cartman svg",
              "description": "example svg image",
              "url": "https://images.ctfassets.net/vbuxn5csp0ik/kgmCrfNzKK9JQggR6KTe4/7493e9eb9ff9f8305f5ddd4801129bda/cartman.svg",
              "size": 1148,
              "contentType": "image/svg+xml",
              contentfulMetadata: {
                tags: null
              },
              fileName: '',
              height: 0,
              linkedFrom: null,
              width: 0
            }
          ]
        }
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandablePagePartComponent ],
      imports: [
        MockModule(SharedModule)
      ],
      providers: [ MockProvider(BodyMediaService) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePagePartComponent);
    component = fixture.componentInstance;
    component.contentItem = contentItem;
    component.getExpandPart = jasmine.createSpy().and.returnValue(of(expand));
    component.expandPart$ = of(expand);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
