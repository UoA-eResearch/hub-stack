import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPageTitlesGQL, Maybe } from '@app/graphql/schema';
import { pluck, map } from 'rxjs/operators';

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
  public allTitles$: Observable<PageTitles> | undefined;
  
  constructor(
    private allPageTitlesGQL: AllPageTitlesGQL,
  ) {
    this.allTitles$ = this.getAllPageTitles();
  }

  public getAllPageTitles() {
    return this.allPageTitlesGQL.fetch()
      .pipe(pluck('data')).pipe(
        map(({articleCollection, caseStudyCollection, equipmentCollection, eventCollection, fundingCollection, serviceCollection, softwareCollection, subHubCollection}) => ({
          articleTitles: articleCollection?.items.map(x=>x?.title) ?? [],
          caseStudyTitles: caseStudyCollection?.items.map(x=>x?.title) ?? [],
          equipmentTitles: equipmentCollection?.items.map(x=>x?.title) ?? [],
          eventTitles: eventCollection?.items.map(x=>x?.title) ?? [],
          fundingTitles: fundingCollection?.items.map(x=>x?.title) ?? [],
          serviceTitles: serviceCollection?.items.map(x=>x?.title) ?? [],
          softwareTitles: softwareCollection?.items.map(x=>x?.title) ?? [],
          subHubTitles: subHubCollection?.items.map(x=>x?.title) ?? [] 
        }))     
      ) as Observable<PageTitles>
  }

  public getAutocompleteTerms(): string[] {
    return this.popularSearches;
  }
}
