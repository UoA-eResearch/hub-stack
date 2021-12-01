import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchFilters, SearchQuery, SearchResults } from '@app/global/searchTypes';
import { environment } from '@environments/environment';
import { skip } from 'rxjs/operators';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController
  const searchStub = {
    "result": {
      "hits": {
        "hits": [
          {
            "fields.summary.en-US": [
              "test summary 1"
            ],
            "_source": {
              "fields": {
                "summary": {
                  "en-US": "test summary 2"
                },
                "title": {
                  "en-US": "test title"
                },
                "slug": {
                  "en-US": "/test"
                },
                "ssoProtected": {
                  "en-US": false
                },
                "category": {
                  "en-US": [
                    {
                      "name": "testCategory",
                      "sys": {
                        "id": "abctest"
                      }
                    }
                  ]
                }
              },
              "sys": {
                "contentType": {
                  "sys": {
                    "id": "article"
                  }
                }
              }
            }
          }
        ],
        "total": {
          "value": 1
        }
      }
    }
  }
  const resultsStub: SearchResults = {
    results: [
      {
        title: 'test title',
        summary: 'test summary 2',
        ssoProtected: false,
        contentType: 'article',
        slug: '/test',
        chips: [
          {
            name: 'testCategory',
            id: 'abctest'
          }
        ]
      }
    ],
    totalResults: 1
  }
  const query: SearchQuery = {
    from: 0,
    includeContentTypes: ['article'],
    query: 'test',
    size: 10,
    filters: {
      category: ['abc123test'],
      relatedOrgs: [],
      stage: []
    }
  };
  window.dataLayer = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#search should make a POST request and return search result', () => {
    service.search(query).subscribe(result => {
      expect(result).toEqual(resultsStub);
    });

    const req = httpTestingController.expectOne(environment.searchUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(searchStub);
  });

  it('initial values of behaviour subjects should be empty', () => {
    expect(service.searchText.getValue()).toBe('')
    expect(service.searchFilters.getValue()).toEqual({ category: [], stage: [], relatedOrgs: [] });
  });

  it('#search should update BehaviourSubjects', () => {
    service.searchText.pipe(
      skip(1)
    ).subscribe(result => {
      expect(result).toBe(query.query);
    });

    service.searchFilters.pipe(
      skip(1)
    ).subscribe((result: SearchFilters | undefined) => {
      expect(result).toEqual(query.filters);
    });

    service.search(query).subscribe();

    const req = httpTestingController.expectOne(environment.searchUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(searchStub);
  });
});
