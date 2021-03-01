import { TestBed, inject } from '@angular/core/testing';

import { SearchFiltersService } from './search-filters.service';

describe('SearchFiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFiltersService]
    });
  });

  it('should be created', inject([SearchFiltersService], (service: SearchFiltersService) => {
    expect(service).toBeTruthy();
  }));
});
