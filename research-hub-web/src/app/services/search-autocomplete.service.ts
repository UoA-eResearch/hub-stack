import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPageTitlesGQL, AllPageTitlesQuery } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {
  private popularSearches: string[] = [
    "animal ethics",
    "animal ethics application",
    "drive",
    "ethics",
    "FIRST",
    "grand challenges",
    "human ethics",
    "impact",
    "internal funding",
    "ORCID",
    "PBRF",
    "privacy",
    "RDF",
    "research storage",
    "survey",
    "thesis",
    "TIF",
    "virtual machine",
  ];
  public allTitles$: Observable<AllPageTitlesQuery>;
  
  constructor(
    private allPageTitlesGQL: AllPageTitlesGQL,
  ) {
    this.allTitles$ = this.getAllPageTitles();
  }

  private getAllPageTitles() {
    try {
      return this.allPageTitlesGQL.fetch()
        .pipe(pluck('data')) as Observable<AllPageTitlesQuery>
    } catch (e) { console.error('Error loading all page titles:', e) };
  }

  public getAutocompleteTerms(): string[] {
    return this.popularSearches;
  }
}
