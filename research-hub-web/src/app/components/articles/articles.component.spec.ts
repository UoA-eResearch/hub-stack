import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponentService } from '../../app.component.service';
import { ArticlesComponent } from './articles.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleCollection, AllArticlesGQL, Article } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '@uoa/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
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
    'icon': {
      'title': 'Pippy',
      'description': 'Sam\'s dog Pippy',
      'url': 'https://imgs.ctfassets.net/vbuxn5csp0ik/014fpqFg0KmnP8NWc9Jyxe/0a1a14a6a0dd438443f70d5f917568fc/Screen_Shot_2020-07-23_at_3.12.46_PM.png',
      '__typename': 'Asset'
    },
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
      declarations: [ArticlesComponent],
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])
      ], providers: [
        AppComponentService,
        LoginService,
        AllArticlesGQL
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  afterEach(() => {
    fixture.destroy();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all articles', () => {
    spyOn(component, 'getAllArticles').and.returnValue(mockAllArticles$);
    component.getAllArticles().subscribe(res => {
      expect(res).toBeTruthy();
    });
  })

  describe('When a url slug is present', async () => {
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(ArticlesComponent);
      component = fixture.componentInstance;
      TestBed.inject(ActivatedRoute).params = of({
        slug: 'first-article'
      });
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('Should get a single article data', () => {
      spyOn(component, 'getArticleBySlug').and.returnValue(mockArticle$);
      component.getArticleBySlug(component.slug).subscribe(res => {
        expect(res.slug).toEqual('first-article');
      });
    });
  });
});
