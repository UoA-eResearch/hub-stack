import { TestBed } from '@angular/core/testing';

import { SearchAutocompleteService } from './search-autocomplete.service';

describe('SearchAutocompleteService', () => {
  let service: SearchAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
