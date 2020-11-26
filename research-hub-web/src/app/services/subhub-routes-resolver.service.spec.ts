import { TestBed } from '@angular/core/testing';

import { SubhubRoutesResolverService } from './subhub-routes-resolver.service';

describe('SubhubRoutesResolverService', () => {
  let service: SubhubRoutesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubhubRoutesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
