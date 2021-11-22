import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { ArticleComponent } from './article.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleCollection, Article } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let appComponentService: PageTitleService;
  let fixture: ComponentFixture<ArticleComponent>;
  let controller: ApolloTestingController;
  const mockAllArticles$: Observable<ArticleCollection> = of({
    'items': [
      {
        '__typename': 'Article',
        'slug': 'first-article',
        'title': 'First article',
        'summary': 'A brief description of the first article. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
        'ssoProtected': false,
        'searchable': true
      },
      {
        '__typename': 'Article',
        'slug': 'top-secret-article',
        'title': 'Top Secret Article',
        'summary': 'For testing SSO',
        'ssoProtected': true,
        'searchable': true
      }
    ],
    '__typename': 'ArticleCollection'
  } as ArticleCollection);

  const mockArticle$: Observable<Article> = of({
    'title': 'First article',
    'summary': 'A brief description of the first article. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
    'ssoProtected': false,
    'sys': {
      'id': '111'
    },
    'body': {
      'json': {
        'data': {},
        'content': [
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'Welcome to the Hub',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'heading-2'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'This is the first article. Sam\'s writing some random text here to pad out space.',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'paragraph'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'Smaller Heading',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'heading-3'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'I\'m just testing how the HTML rendering works.',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'paragraph'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'content': [
                  {
                    'data': {},
                    'content': [
                      {
                        'data': {},
                        'marks': [],
                        'value': 'I\'m just testing how a bullet point list works.',
                        'nodeType': 'text'
                      }
                    ],
                    'nodeType': 'paragraph'
                  }
                ],
                'nodeType': 'list-item'
              },
              {
                'data': {},
                'content': [
                  {
                    'data': {},
                    'content': [
                      {
                        'data': {},
                        'marks': [],
                        'value': 'Wow, it has bullets.',
                        'nodeType': 'text'
                      }
                    ],
                    'nodeType': 'paragraph'
                  }
                ],
                'nodeType': 'list-item'
              },
              {
                'data': {},
                'content': [
                  {
                    'data': {},
                    'content': [
                      {
                        'data': {},
                        'marks': [],
                        'value': 'Run out of generic text ',
                        'nodeType': 'text'
                      },
                      {
                        'data': {},
                        'marks': [
                          {
                            'type': 'italic'
                          }
                        ],
                        'value': 'ideas ',
                        'nodeType': 'text'
                      },
                      {
                        'data': {},
                        'marks': [],
                        'value': 'so I\'ll stop now.',
                        'nodeType': 'text'
                      }
                    ],
                    'nodeType': 'paragraph'
                  }
                ],
                'nodeType': 'list-item'
              }
            ],
            'nodeType': 'unordered-list'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'An Even Smaller Heading',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'heading-4'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': 'Last thing I\'ll check is how a link works, have you heard of ',
                'nodeType': 'text'
              },
              {
                'data': {
                  'uri': 'https://google.com/'
                },
                'content': [
                  {
                    'data': {},
                    'marks': [],
                    'value': 'Google',
                    'nodeType': 'text'
                  }
                ],
                'nodeType': 'hyperlink'
              },
              {
                'data': {},
                'marks': [],
                'value': '?',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'paragraph'
          },
          {
            'data': {},
            'content': [
              {
                'data': {},
                'marks': [],
                'value': '',
                'nodeType': 'text'
              }
            ],
            'nodeType': 'paragraph'
          }
        ],
        'nodeType': 'document'
      },
      '__typename': 'ArticleBody'
    },
    'slug': 'first-article',
    'searchable': true,
    'relatedItemsCollection': {
      'items': [
        {
          'title': 'Super dooper research service',
          'summary': 'The best service ever. It saved my life.',
          'slug': 'super-dooper-research-service',
          '__typename': 'Service'
        },
        {
          'title': 'Death Star',
          'summary': 'Mobile space station and galactic superweapon.',
          'slug': 'death-star',
          '__typename': 'Equipment'
        }
      ],
      '__typename': 'ArticleRelatedItemsCollection'
    },
    '__typename': 'Article'
  } as unknown as Article);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArticleComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([])
      ], providers: [
        MockProvider(PageTitleService)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should get all articles', () => {
  //   spyOn(component, 'getAllArticles').and.returnValue(mockAllArticles$);
  //   component.getAllArticles().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // })

  // describe('When a url slug is present', async () => {
  //   beforeEach(() => {
  //     controller = TestBed.inject(ApolloTestingController);
  //     fixture = TestBed.createComponent(ArticleComponent);
  //     component = fixture.componentInstance;
  //     TestBed.inject(ActivatedRoute).params = of({
  //       slug: 'first-article'
  //     });
  //     fixture.detectChanges();
  //   });

  //   it('Should get a single article data', () => {
  //     spyOn(component, 'getArticleBySlug').and.returnValue(mockArticle$);
  //     component.getArticleBySlug(component.slug).subscribe(res => {
  //       expect(res.slug).toEqual('first-article');
  //     });
  //   });
  // });
});
