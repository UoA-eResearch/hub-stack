import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ArticleListComponent } from './article-list.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleService } from '@services/page-title.service';
import { CollectionListComponent } from '@app/components/shared/collection-list/collection-list.component';
import { ArticleCollection } from '@app/graphql/schema';
import { Observable, of } from 'rxjs';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
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
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArticleListComponent,
        MockComponent(CollectionListComponent)
      ],
      imports: [
        ApolloTestingModule,
        MockModule(SharedModule),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockProvider(PageTitleService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('Should get all articles', () => {
  //   spyOn(component, 'getAllArticles').and.returnValue(mockAllArticles$);
  //   component.getAllArticles().subscribe(res => {
  //     expect(res).toBeTruthy();
  //   });
  // });
});
