import { TestBed } from '@angular/core/testing';

import { SwUpdatesService } from './sw-updates.service';

describe('SwUpdatesService', () => {
  let service: SwUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
