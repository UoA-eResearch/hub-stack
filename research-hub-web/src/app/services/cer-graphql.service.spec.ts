import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { CerGraphqlService } from './cer-graphql.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('CerGraphqlService', () => {
  let service: CerGraphqlService;

  const mock_subHubCollectionWithChildPagesSlugs =
    [
      {
        'slug': 'engagement',
        'title': 'Engagement',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'death-star',
              '__typename': 'Equipment'
            },
            {
              'slug': 'super-dooper-research-service',
              '__typename': 'Service'
            },
            {
              'slug': 'top-secret-article',
              '__typename': 'Article'
            },
            {
              'slug': 'first-article',
              '__typename': 'Article'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      },
      {
        'slug': 'cer',
        'title': 'Centre for eResearch',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'our-services',
              '__typename': 'SubHub'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      },
      {
        'slug': 'our-services',
        'title': 'Our Services',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'engagement',
              '__typename': 'SubHub'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      }
    ];

  const circularMock_subHubCollectionWithChildPagesSlugs =
    [
      {
        'slug': 'engagement',
        'title': 'Engagement',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'death-star',
              '__typename': 'Equipment'
            },
            {
              'slug': 'super-dooper-research-service',
              '__typename': 'Service'
            },
            {
              'slug': 'top-secret-article',
              '__typename': 'Article'
            },
            {
              'slug': 'cer',
              '__typename': 'SubHub'
            },
            {
              'slug': 'first-article',
              '__typename': 'Article'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      },
      {
        'slug': 'cer',
        'title': 'Centre for eResearch',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'our-services',
              '__typename': 'SubHub'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      },
      {
        'slug': 'our-services',
        'title': 'Our Services',
        'subhubPagesCollection': {
          'items': [
            {
              'slug': 'engagement',
              '__typename': 'SubHub'
            }
          ],
          '__typename': 'SubHubSubhubPagesCollection'
        },
        '__typename': 'SubHub'
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        CommonModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ]
    });
    service = TestBed.inject(CerGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct breadcrumbs', async () => {
    service['_subHubCollectionWithChildPagesSlugs'] = mock_subHubCollectionWithChildPagesSlugs;
    const expectedBreadcrumbs = [
      {
        'title': 'Engagement',
        'slug': 'engagement'
      },
      {
        'title': 'Our Services',
        'slug': 'our-services'
      },
      {
        'title': 'Centre for eResearch',
        'slug': 'cer'
      }
    ];

    const entrySlug = 'first-article';
    const breadCrumbs = await service.getParentSubHubs(entrySlug)
    expect(breadCrumbs).toEqual(expectedBreadcrumbs);
  });

  it('should throw an error if a circular SubHub structure is detected', async () => {
    service['_subHubCollectionWithChildPagesSlugs'] = circularMock_subHubCollectionWithChildPagesSlugs;

    const entrySlug = 'first-article';
    await expectAsync(service.getParentSubHubs(entrySlug)).toBeRejectedWithError('Error loading breadcrumbs');
  });
});
