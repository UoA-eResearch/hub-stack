import { TestBed } from '@angular/core/testing';

import { HomeScrollService } from './home-scroll.service';

fdescribe('HomeScrollService', () => {
  let service: HomeScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
