import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContentGraphService } from './content-graph.service';

describe('ContentGraphService', () => {
  let service: ContentGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContentGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
