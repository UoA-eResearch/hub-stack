import { TestBed, inject } from '@angular/core/testing';

import { SearchResultsComponentService } from './search-results-component.service';
import { ResearchHubApiService } from 'app/services/research-hub-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SearchResultsComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchResultsComponentService,
        ResearchHubApiService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([SearchResultsComponentService], (service: SearchResultsComponentService) => {
    expect(service).toBeTruthy();
  }));
});
