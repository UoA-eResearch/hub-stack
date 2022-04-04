import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContentGraphResolver } from './content-graph.resolver';

describe('ContentGraphService', () => {
  let service: ContentGraphResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContentGraphResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
