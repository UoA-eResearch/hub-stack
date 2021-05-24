import { TestBed } from '@angular/core/testing';

import { BodyMediaService } from './body-media.service';

describe('BodyMediaService', () => {
  let service: BodyMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
