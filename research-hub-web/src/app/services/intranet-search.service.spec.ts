import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IntranetSearchQuery, IntranetSearchResults } from '@app/global/searchTypes';
import { environment } from '@environments/environment';

import { IntranetSearchService } from './intranet-search.service';

describe('IntranetSearchService', () => {
  let service: IntranetSearchService;
  let httpTestingController: HttpTestingController
  
  const searchStub = {
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
  }

  const resultsStub: IntranetSearchResults = {
    results: [
      {
        title: 'test title',
        summary: 'test summary 2',
        url: 'https://www.google.co.nz/',
      }
    ],
    totalResults: 1
  }

  const query: IntranetSearchQuery = {
    page: 1,
    query: 'test',
    size: 10,
    sort: 'relevance'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IntranetSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#search should make a POST request and return search result', () => {
    service.search(query).subscribe(result => {
      expect(result).toEqual(resultsStub);
    });

    const req = httpTestingController.expectOne(environment.intranetSearchUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(searchStub);
  });
});
