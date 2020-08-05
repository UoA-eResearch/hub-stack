import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhubsComponent } from './subhubs.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SharedModule } from '../shared/app.shared.module';
import { SubhubsRoutingModule } from './subhubs-routing.module';
import { RouterModule } from '@angular/router';
// import { Observable } from 'apollo-link';

import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, from } from 'rxjs';
import {
  SubHub,
  SubHubCollection,
  AllSubHubChildPagesGQL,
  AllContentItemParentSubHubsGQL,
  SubHubOrder,
  // AllSubHubChildPagesQuery,
  // AllContentItemParentSubHubsQuery
} from "../../graphql/schema";


describe('SubhubsComponent', () => {
  let component: SubhubsComponent;
  let fixture: ComponentFixture<SubhubsComponent>;
  let backend: ApolloTestingController;
  let controller: ApolloTestingController;
  let subHubInfoAndChildrenSpy: any; // returns mock query data
  let possibleSubHubParentsSpy: any;
  let validParentsSpy: any;

  // all the linkedFrom pages that are subhubs for the current subhub
  const mockParentLinks$: Observable<SubHubCollection> = of({
    "items": [
      {
        "title": "a subhub to be included as level 2 of a landing page subhub",
        "ssoProtected": true,
        "linkedFrom": {
          "subHubCollection": {
            "items": [
              {
                "slug": "landing-page-for-a-sub-hub",
                "title": "Landing page for a 'sub-hub'",
                "summary": "This is the landing page that demos everything a subhub can do..",
                "__typename": "SubHub"
              }
            ],
            "__typename": "SubHubCollection"
          },
          "__typename": "SubHubLinkingCollections"
        },
        "__typename": "SubHub"
      }
    ],
    "__typename": "SubHubCollection"
  } as SubHubCollection);

  // All the data for an example parent subhub.
  const childrenOfParentLink$: Observable<SubHubCollection> = of({
    "items": [
      {
        "slug": "landing-page-for-a-sub-hub",
        "title": "Landing page for a 'sub-hub'",
        "summary": "This is the landing page that demos everything a subhub can do..",
        "body": {
          "json": {
            "data": {

            },
            "content": [
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Wow. Much excite. I can describe all sorts of useful stuff here. ",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              },
              {
                "data": {
                  "target": {
                    "sys": {
                      "id": "21lOuLkozscCcNZHw0BRf",
                      "type": "Link",
                      "linkType": "Asset"
                    }
                  }
                },
                "content": [

                ],
                "nodeType": "embedded-asset-block"
              },
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Heaps and heaps of info about the subhub actually. ",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              }
            ],
            "nodeType": "document"
          },
          "__typename": "SubHubBody"
        },
        "ssoProtected": false,
        "searchable": true,
        "subhubPagesCollection": {
          "items": [
            {
              "__typename": "Equipment",
              "slug": "death-star",
              "title": "Death Star",
              "ssoProtected": true,
              "summary": "Mobile space station and galactic superweapon."
            },
            {
              "__typename": "Service",
              "slug": "super-dooper-research-service",
              "title": "Super dooper research service",
              "ssoProtected": true,
              "summary": "The best service ever. It saved my life."
            },
            {
              "__typename": "SubHub",
              "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
              "title": "a subhub to be included as level 2 of a landing page subhub",
              "ssoProtected": true,
              "summary": "as the title says"
            },
            {
              "__typename": "Article",
              "slug": "top-secret-article",
              "title": "Top Secret Article",
              "ssoProtected": true,
              "summary": "For testing SSO"
            },
            {
              "__typename": "Article",
              "slug": "first-article",
              "title": "First article",
              "ssoProtected": false,
              "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day."
            }
          ],
          "__typename": "SubHubSubhubPagesCollection"
        },
        "__typename": "SubHub"
      }
    ],
    "__typename": "SubHubCollection"
  } as SubHubCollection);

  // All the data required for the current subhub. 
  const currentSubHubData$: Observable<SubHubCollection> = of({
    "items": [
      {
        "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
        "title": "a subhub to be included as level 2 of a landing page subhub",
        "summary": "as the title says",
        "body": {
          "json": {
            "data": {

            },
            "content": [
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Some more stuff here. This subhub is intended as the second level of a landing page (top level) subhub.",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              }
            ],
            "nodeType": "document"
          },
          "__typename": "SubHubBody"
        },
        "ssoProtected": true,
        "searchable": true,
        "subhubPagesCollection": {
          "items": [
            {
              "__typename": "Equipment",
              "slug": "death-star",
              "title": "Death Star",
              "ssoProtected": true,
              "summary": "Mobile space station and galactic superweapon."
            },
            {
              "__typename": "Article",
              "slug": "first-article",
              "title": "First article",
              "ssoProtected": false,
              "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day."
            }
          ],
          "__typename": "SubHubSubhubPagesCollection"
        },
        "__typename": "SubHub"
      }
    ],
    "__typename": "SubHubCollection"
  } as SubHubCollection);

  // need to evaluate that its eliminating wrong parents. the all items in the linkedFromResponse (maybe do two, a right and a wrong one.)

  // const allMockSubHubs$:   // the result when no subhub slug is found.
  const allMockSubHubs$: Observable<SubHubCollection> = of({
    "items": [
      {
        "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
        "title": "a subhub to be included as level 2 of a landing page subhub",
        "summary": "as the title says",
        "body": {
          "json": {
            "data": {

            },
            "content": [
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Some more stuff here. This subhub is intended as the second level of a landing page (top level) subhub.",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              }
            ],
            "nodeType": "document"
          },
          "__typename": "SubHubBody"
        },
        "ssoProtected": true,
        "searchable": true,
        "subhubPagesCollection": {
          "items": [
            {
              "__typename": "Equipment",
              "slug": "death-star",
              "title": "Death Star",
              "ssoProtected": true,
              "summary": "Mobile space station and galactic superweapon."
            },
            {
              "__typename": "Article",
              "slug": "first-article",
              "title": "First article",
              "ssoProtected": false,
              "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day."
            }
          ],
          "__typename": "SubHubSubhubPagesCollection"
        },
        "__typename": "SubHub"
      },
      {
        "slug": "landing-page-for-a-sub-hub",
        "title": "Landing page for a 'sub-hub'",
        "summary": "This is the landing page that demos everything a subhub can do..",
        "body": {
          "json": {
            "data": {

            },
            "content": [
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Wow. Much excite. I can describe all sorts of useful stuff here. ",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              },
              {
                "data": {
                  "target": {
                    "sys": {
                      "id": "21lOuLkozscCcNZHw0BRf",
                      "type": "Link",
                      "linkType": "Asset"
                    }
                  }
                },
                "content": [

                ],
                "nodeType": "embedded-asset-block"
              },
              {
                "data": {

                },
                "content": [
                  {
                    "data": {

                    },
                    "marks": [

                    ],
                    "value": "Heaps and heaps of info about the subhub actually. ",
                    "nodeType": "text"
                  }
                ],
                "nodeType": "paragraph"
              }
            ],
            "nodeType": "document"
          },
          "__typename": "SubHubBody"
        },
        "ssoProtected": false,
        "searchable": true,
        "subhubPagesCollection": {
          "items": [
            {
              "__typename": "Equipment",
              "slug": "death-star",
              "title": "Death Star",
              "ssoProtected": true,
              "summary": "Mobile space station and galactic superweapon."
            },
            {
              "__typename": "Service",
              "slug": "super-dooper-research-service",
              "title": "Super dooper research service",
              "ssoProtected": true,
              "summary": "The best service ever. It saved my life."
            },
            {
              "__typename": "SubHub",
              "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
              "title": "a subhub to be included as level 2 of a landing page subhub",
              "ssoProtected": true,
              "summary": "as the title says"
            },
            {
              "__typename": "Article",
              "slug": "top-secret-article",
              "title": "Top Secret Article",
              "ssoProtected": true,
              "summary": "For testing SSO"
            },
            {
              "__typename": "Article",
              "slug": "first-article",
              "title": "First article",
              "ssoProtected": false,
              "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day."
            }
          ],
          "__typename": "SubHubSubhubPagesCollection"
        },
        "__typename": "SubHub"
      }
    ],
    "__typename": "SubHubCollection"
  } as SubHubCollection);

  const parentSubHubs = of([
    {
      "slug": "landing-page-for-a-sub-hub",
      "title": "Landing page for a 'sub-hub'",
      "summary": "This is the landing page that demos everything a subhub can do..",
      "body": {
        "json": {
          "data": {},
          "content": [
            {
              "data": {},
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Wow. Much excite. I can describe all sorts of useful stuff here. ",
                  "nodeType": "text"
                }
              ],
              "nodeType": "paragraph"
            },
            {
              "data": {
                "target": {
                  "sys": {
                    "id": "21lOuLkozscCcNZHw0BRf",
                    "type": "Link",
                    "linkType": "Asset"
                  }
                }
              },
              "content": [],
              "nodeType": "embedded-asset-block"
            },
            {
              "data": {},
              "content": [
                {
                  "data": {},
                  "marks": [],
                  "value": "Heaps and heaps of info about the subhub actually. ",
                  "nodeType": "text"
                }
              ],
              "nodeType": "paragraph"
            }
          ],
          "nodeType": "document"
        },
        "__typename": "SubHubBody"
      },
      "ssoProtected": false,
      "searchable": true,
      "subhubPagesCollection": {
        "items": [
          {
            "__typename": "Equipment",
            "slug": "death-star",
            "title": "Death Star",
            "ssoProtected": true,
            "summary": "Mobile space station and galactic superweapon."
          },
          {
            "__typename": "Service",
            "slug": "super-dooper-research-service",
            "title": "Super dooper research service",
            "ssoProtected": true,
            "summary": "The best service ever. It saved my life."
          },
          {
            "__typename": "SubHub",
            "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
            "title": "a subhub to be included as level 2 of a landing page subhub",
            "ssoProtected": true,
            "summary": "as the title says"
          },
          {
            "__typename": "Article",
            "slug": "top-secret-article",
            "title": "Top Secret Article",
            "ssoProtected": true,
            "summary": "For testing SSO"
          },
          {
            "__typename": "Article",
            "slug": "first-article",
            "title": "First article",
            "ssoProtected": false,
            "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day."
          }
        ],
        "__typename": "SubHubSubhubPagesCollection"
      },
      "__typename": "SubHub"
    }
  ]) as any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubhubsComponent],
      imports: [
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ], providers: [
        AllSubHubChildPagesGQL,
        AllContentItemParentSubHubsGQL
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.get(ApolloTestingController);
    subHubInfoAndChildrenSpy = spyOn(SubhubsComponent.prototype, 'getSubHubInfoAndChildrenObservable').and.returnValue(currentSubHubData$);
    possibleSubHubParentsSpy = spyOn(SubhubsComponent.prototype, 'getPossibleParentPagesObservable').and.returnValue(mockParentLinks$);
    validParentsSpy = spyOn(SubhubsComponent.prototype, 'getParentSubHubsFromCurrentSlug').and.returnValue(parentSubHubs);

    backend = TestBed.get(ApolloTestingController);
    fixture = TestBed.createComponent(SubhubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Title for a subhub page collection item should be truthy.', async () => {
    const de = fixture.debugElement.query(By.css('#title'));
    // expect(de.nativeElement.innerHTML).toEqual("Landing page for a 'sub-hub'");
    // console.log(de);
    expect(de.nativeElement.innerHTML).toBeTruthy();
  });

  it('Should contain a parent subhub', () => {
    let d = document.getElementsByClassName('parent-title');
    console.log(d);

    let e = fixture.debugElement.query(By.css('#parent-title'));
    console.log(e);
    expect(e).toBeTruthy();
  });

  xit('Should not list invalid parents as parent.');
});
