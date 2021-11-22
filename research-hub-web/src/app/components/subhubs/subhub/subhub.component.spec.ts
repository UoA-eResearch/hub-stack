import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SharedModule } from '@components/shared/app.shared.module';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import {
  SubHub,
  SubHubCollection,
  AllContentItemParentSubHubsGQL,
} from "@graphql/schema";
import { PageTitleService } from '@services/page-title.service';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { SubhubComponent } from './subhub.component';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { SubhubListComponent } from '../subhub-list/subhub-list.component';


describe('SubhubsComponent', () => {
  let component: SubhubComponent;
  let fixture: ComponentFixture<SubhubComponent>;
  let controller: ApolloTestingController;
  let subHubSpy: any; // returns mock query data
  let allSubHubsSpy: any; // returns mock query data

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
  } as unknown as SubHubCollection);

  // A Single SubHub
  // All the data for an example parent subhub.
  const singleSubHub$: Observable<SubHub> = of({
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
  } as unknown as SubHub);

  // All the data required for the current subhub.
  const currentSubHubData$: Observable<SubHubCollection> = of({
    "items": [
      {
        "slug": "a-subhub-to-be-included-as-level-2-of-a-landing-page-subhub",
        "title": "a subhub to be included as level 2 of a landing page subhub",
        "summary": "as the title says",
        "sys": {
          "id": "111"
        },
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
  } as unknown as SubHubCollection);

  // need to evaluate that its eliminating wrong parents. the all items in the linkedFromResponse (maybe do two, a right and a wrong one.)

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubhubComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([
          { path: 'subhub/list', component: SubhubListComponent }
        ]),
      ], providers: [
        MockProvider(PageTitleService),
        MockProvider(AllContentItemParentSubHubsGQL)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SubhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a url slug is present', async () => {
    const testSlug: string = 'landing-page-for-a-sub-hub';

    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(SubhubComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: testSlug
      });
      fixture.detectChanges();      
      component.ngOnInit();
    })

    it('Should get a single SubHub', async () => {
      spyOn(component, 'getSubHubBySlug').and.returnValue(singleSubHub$);

      fixture.whenStable().then(() => {
        component.getSubHubBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    })
  });
});
