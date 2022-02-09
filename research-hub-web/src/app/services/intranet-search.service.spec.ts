import { TestBed } from '@angular/core/testing';

import { IntranetSearchService } from './intranet-search.service';

describe('IntranetSearchService', () => {
  let service: IntranetSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntranetSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
