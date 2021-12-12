import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { SubhubListComponent } from './subhub-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { SubHubCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('SubhubListComponent', () => {
  let component: SubhubListComponent;
  let fixture: ComponentFixture<SubhubListComponent>;
  let controller: ApolloTestingController;

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
  } as unknown as SubHubCollection);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SubhubListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(SubhubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should get all SubHubs', () => {
    spyOn(component, 'loadContent').and.returnValue(allMockSubHubs$);

    fixture.whenStable().then(() => {
      component.loadContent().subscribe(res => {
        expect(res.items.length).toBe(2);
      });
    })
  })
});
