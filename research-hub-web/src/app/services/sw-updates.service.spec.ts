import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { MockProvider } from 'ng-mocks';

import { SwUpdatesService } from './sw-updates.service';

describe('SwUpdatesService', () => {
  // example: https://github.com/angular/angular/blob/master/aio/src/app/sw-updates/sw-updates.service.spec.ts

  let service: SwUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(SwUpdate)
      ]
    });
    service = TestBed.inject(SwUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
