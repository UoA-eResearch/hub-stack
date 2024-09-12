import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageTitleService } from '@services/page-title.service';
import { ProcessComponent } from './process.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Process } from '@graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/app.material.module';
import { SharedModule } from '@components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BreadcrumbsComponent } from '@app/components/shared/breadcrumbs/breadcrumbs.component';
import { ProcessListComponent } from '../process-list/process-list.component';

describe('ProcessComponent', () => {
  let component: ProcessComponent;
  let fixture: ComponentFixture<ProcessComponent>;
  let controller: ApolloTestingController;

  const testSlug: string = 'first-article';

  const mockProcess$: Observable<Process> = of({
    'title': 'First process',
    'summary': 'A brief description of the first process. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
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
                'value': 'This is the first process. Sam\'s writing some random text here to pad out space.',
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
      '__typename': 'ProcessBody'
    },
    'slug': 'first-process',
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
      '__typename': 'ProcessRelatedItemsCollection'
    },
    '__typename': 'Process'
  } as unknown as Process);

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [
        ProcessComponent,
        MockComponent(BreadcrumbsComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(CommonModule),
        MockModule(MaterialModule),
        MockModule(SharedModule),
        MockModule(BrowserAnimationsModule),
        RouterTestingModule.withRoutes([
          { path: 'process/list', component: ProcessListComponent }
        ])
      ], providers: [
        MockProvider(PageTitleService)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(ActivatedRoute).params = of({
      slug: testSlug
    });
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ProcessComponent);
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
    beforeEach(() => {
      controller = TestBed.inject(ApolloTestingController);
      fixture = TestBed.createComponent(ProcessComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      // component.ngOnInit();
    });

    it('Should get a single process data', () => {
      spyOn(component, 'getProcessBySlug').and.returnValue(mockProcess$);

      fixture.whenStable().then(() => {
        component.getProcessBySlug(testSlug).subscribe(res => {
          expect(res.slug).toEqual(testSlug);
        });
      })
    });
  });
});
