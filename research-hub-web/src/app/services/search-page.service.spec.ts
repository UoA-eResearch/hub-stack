import { TestBed } from '@angular/core/testing';

import { SearchPageServiceService } from './search-page-service.service';

describe('SearchPageServiceService', () => {
  let service: SearchPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
