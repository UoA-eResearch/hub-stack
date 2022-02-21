import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IntranetSearchQuery, IntranetSearchResults, SearchFilters, SearchQuery, SearchResults } from '@app/global/searchTypes';
import { environment } from '@environments/environment';
import { skip } from 'rxjs/operators';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController;

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
  };

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
  };

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

  const intranetSearchStub = {
    "result": {
      "record_count": 1,
      "records": {
        "page": [{
            "sections": [],
            "title": "test title",
            "type": "",
            "description": "description",
            "collection": "Staff_intranet",
            "external_id": "abc",
            "image": "",
            "url": "https://www.google.co.nz/",
            "published_at": "2022-02-13T05:29:36Z",
            "updated_at": "2022-02-08T03:48:19Z",
            "popularity": 10,
            "body": "test summary 2",
            "info": "",
            "_index": "abc",
            "_type": "_doc",
            "_score": 184.14064,
            "_version": null,
            "_explanation": null,
            "sort": null,
            "highlight": {},
            "id": "abc"
          }
        ]
      },
      "info": {
        "page": {
          "query": "Tis better to have tested and lost than never to have tested at all",
          "current_page": 1,
          "num_pages": 1,
          "per_page": 10,
          "total_result_count": 1,
          "facets": {}
        }
      },
      "errors": {}
    }
  };

  const intranetResultsStub: IntranetSearchResults = {
    results: [
      {
        title: 'test title',
        summary: 'test summary 2',
        url: 'https://www.google.co.nz/',
      }
    ],
    totalResults: 1
  };

  const intranetQuery: IntranetSearchQuery = {
    page: 1,
    query: 'test',
    size: 10,
    sort: 'relevance'
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

  it('#searchIntranet should make a POST request and return search result', () => {
    service.searchIntranet(intranetQuery).subscribe(result => {
      expect(result).toEqual(intranetResultsStub);
    });

    const req = httpTestingController.expectOne(environment.intranetSearchUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(intranetSearchStub);
  });
});
