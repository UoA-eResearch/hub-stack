import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { PageTitles, SearchAutocompleteService } from './search-autocomplete.service';

describe('SearchAutocompleteService', () => {
  let service: SearchAutocompleteService;

  const mockPageTitles$: Observable<PageTitles> = of({
    articleTitles: ['an article'],
    caseStudyTitles: ['a caseStudy'],
    equipmentTitles: ['an equipment'],
    eventTitles: ['an event'],
    fundingTitles: ['a funding'],
    serviceTitles: ['a service'],
    softwareTitles: ['a software'],
    subHubTitles: ['a subHub']
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of autocomplete terms', () => {
    const terms = service.getAutocompleteTerms();
    expect(terms.length).toBeGreaterThan(0);
  });

  it('should fetch all page titles', () => {
    spyOn(service, 'getAllPageTitles').and.returnValue(mockPageTitles$);
    service.getAllPageTitles().subscribe(res => {
      expect(res).toBeTruthy();
    });
  });
});
