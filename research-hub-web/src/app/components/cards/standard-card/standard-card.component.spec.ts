import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '@app/graphql/schema';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { MockModule, MockPipe } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { StandardCardComponent } from './standard-card.component';

describe('StandardCardComponent', () => {
  let component: StandardCardComponent;
  let fixture: ComponentFixture<StandardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StandardCardComponent,
        MockPipe(ContentTypeDisplayNamePipe)

      ],
      imports: [
        MockModule(MatCardModule),
        MockModule(MatIconModule),
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const article: Article = {
      banner: null,
      bodyText: null,
      callToAction: null,
      callToActionLabel: '',
      categoryCollection: null,
      contentfulMetadata: {
        tags: [],
      },
      icon: null,
      interestedPartiesCollection: null,
      keywords: null,
      linkedFrom: null,
      maoriProverb: '',
      nextReview: 0,
      owner: null,
      publisher: null,
      relatedContactsCollection: null,
      relatedDocsCollection: null,
      relatedItemsCollection: null,
      relatedOrgsCollection: null,
      searchable: false,
      slug: '',
      ssoProtected: true,
      stageCollection: null,
      summary: '',
      sys: {
        id: '',
        environmentId: '',
        firstPublishedAt: '',
        publishedAt: '',
        publishedVersion: 0,
        spaceId: ''
      },
      title: 'Test Article',
      __typename: 'Article'
    }

    fixture = TestBed.createComponent(StandardCardComponent);
    component = fixture.componentInstance;

    component.contentItem = article;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
