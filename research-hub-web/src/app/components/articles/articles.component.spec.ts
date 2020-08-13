import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ArticleCollection, AllArticlesGQL } from '../../graphql/schema';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material.module';
import { SharedModule } from '../shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CerGraphqlService } from '../../services/cer-graphql.service';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let controller: ApolloTestingController;
  let spy: any; // Returns mock query data
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent],
      imports: [
        RouterModule.forRoot([]),
        ApolloTestingModule,
        CommonModule,
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ], providers: [
        AllArticlesGQL,
        CerGraphqlService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.get(ApolloTestingController);
    spy = spyOn(ArticlesComponent.prototype, 'getAllArticles').and.returnValue(mockAllArticles$);

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Article Collection as title', async () => {
    const de = fixture.debugElement.query(By.css('#title'));
    expect(de.nativeElement.innerHTML).toEqual('Article Collection');
  });

});
