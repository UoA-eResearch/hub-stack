import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllComponent } from './all.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { AllSearchableContentPublicFieldsGQL, AllSearchableContentPublicFieldsQuery } from '@graphql/schema';
import { Observable, of } from 'rxjs';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;
  let backend: ApolloTestingController;
  let spy: any;

  const mockAllSearchableContent$: Observable<AllSearchableContentPublicFieldsQuery> = of({
    'articleCollection': {
      'items': [
        {
          '__typename': 'Article',
          'slug': 'first-article',
          'title': 'First article',
          'summary': 'A brief description of the first article. I\'m writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.',
          'ssoProtected': false,
          'searchable': true,
          'icon': {
            'title': 'Pippy',
            'description': 'Sam\'s dog Pippy',
            'url': 'https://images.ctfassets.net/vbuxn5csp0ik/014fpqFg0KmnP8NWc9Jyxe/0a1a14a6a0dd438443f70d5f917568fc/Screen_Shot_2020-07-23_at_3.12.46_PM.png',
            '__typename': 'Asset'
          }
        },
        {
          '__typename': 'Article',
          'slug': 'evil-article',
          'title': 'Evil Article',
          'summary': 'An article for testing our Apollo server security',
          'ssoProtected': false,
          'searchable': true,
          'icon': null
        },
        {
          '__typename': 'Article',
          'slug': 'top-secret-article',
          'title': 'Top Secret Article',
          'summary': 'For testing SSO',
          'ssoProtected': true,
          'searchable': true,
          'icon': null
        }
      ],
      '__typename': 'ArticleCollection'
    },
    'equipmentCollection': {
      'items': [

      ],
      '__typename': 'EquipmentCollection'
    },
    'serviceCollection': {
      'items': [
        {
          '__typename': 'Service',
          'slug': 'super-dooper-research-service',
          'title': 'Super dooper research service',
          'summary': 'The best service ever. It saved my life.',
          'ssoProtected': true,
          'searchable': true
        }
      ],
      '__typename': 'ServiceCollection'
    },
    'subHubCollection': {
      'items': [
        {
          '__typename': 'SubHub',
          'slug': 'engagement',
          'title': 'Engagement',
          'summary': 'This is a level 3 SubHub',
          'ssoProtected': false,
          'searchable': true
        },
        {
          '__typename': 'SubHub',
          'slug': 'cer',
          'title': 'Centre for eResearch',
          'summary': 'CeR. A root level SubHub.',
          'ssoProtected': false,
          'searchable': true
        },
        {
          '__typename': 'SubHub',
          'slug': 'our-services',
          'title': 'Our Services',
          'summary': 'as the title says (level 2 SubHub)',
          'ssoProtected': true,
          'searchable': true
        }
      ],
      '__typename': 'SubHubCollection'
    },
    'caseStudyCollection': {
      'items': [

      ],
      '__typename': 'CaseStudyCollection'
    }
  } as AllSearchableContentPublicFieldsQuery)

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AllComponent],
      imports: [ApolloTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    backend = TestBed.inject(ApolloTestingController);
    spy = spyOn(AllComponent.prototype, 'getAllSearchableContent').and.returnValue(mockAllSearchableContent$);

    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the correct count of collections', () => {
    component.getAllSearchableContent().subscribe(res => {
      expect(component.allContentLength(res)).toEqual(7);
    })
  })
});
