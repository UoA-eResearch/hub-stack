import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPageTitlesGQL } from '@app/graphql/schema';
import { map } from 'rxjs/operators';

export interface PageTitles {
  articleTitles: string[];
  caseStudyTitles: string[];
  equipmentTitles: string[];
  eventTitles: string[];
  fundingTitles: string[];
  serviceTitles: string[];
  softwareTitles: string[];
  subHubTitles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {
  // Popular search terms used in the ResearchHub obtained from site search analytics
  private popularSearches: string[] = [
    "Animal Ethics",
    "Animal Ethics Application",
    "Drive",
    "Ethics",
    "FIRST",
    "Grand Challenges",
    "Human Ethics",
    "Impact",
    "Internal Funding",
    "ORCID",
    "PBRF",
    "Privacy",
    "RDF",
    "Research Storage",
    "Survey",
    "Thesis",
    "TIF",
    "Virtual Machine",
  ];
  // All published page titles in Contentful
  public allTitles$: Observable<PageTitles>;
  
  constructor(
    private allPageTitlesGQL: AllPageTitlesGQL,
  ) {
    this.allTitles$ = this.getAllPageTitles();
  }

  public getAllPageTitles() {
    return this.allPageTitlesGQL.fetch()
      .pipe(
        map(result => ({
          articleTitles: result?.data?.articleCollection?.items.map(x=>x?.title) ?? [],
          caseStudyTitles: result?.data?.caseStudyCollection?.items.map(x=>x?.title) ?? [],
          equipmentTitles: result?.data?.equipmentCollection?.items.map(x=>x?.title) ?? [],
          eventTitles: result?.data?.eventCollection?.items.map(x=>x?.title) ?? [],
          fundingTitles: result?.data?.fundingCollection?.items.map(x=>x?.title) ?? [],
          serviceTitles: result?.data?.serviceCollection?.items.map(x=>x?.title) ?? [],
          softwareTitles: result?.data?.softwareCollection?.items.map(x=>x?.title) ?? [],
          subHubTitles: result?.data?.subHubCollection?.items.map(x=>x?.title) ?? [] 
        }))     
      ) as Observable<PageTitles>
  }

  public getAutocompleteTerms(): string[] {
    return this.popularSearches;
  }
}
