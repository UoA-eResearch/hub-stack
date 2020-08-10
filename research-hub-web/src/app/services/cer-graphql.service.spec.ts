import { TestBed } from '@angular/core/testing';

import { CerGraphqlService } from './cer-graphql.service';

describe('CerGraphqlService', () => {
  let service: CerGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CerGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
