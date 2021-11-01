import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPageTitlesGQL, AllPageTitlesQuery, ArticleCollection, CaseStudyCollection, EquipmentCollection, EventCollection, FundingCollection, ServiceCollection, SoftwareCollection, SubHubCollection } from '@app/graphql/schema';
import { pluck, map } from 'rxjs/operators';

export interface PageTitles {
  articleCollection: {
      __typename?: "Article";
      title: string;
  }[];
  caseStudyCollection: {
      __typename?: "CaseStudy";
      title: string;
  }[];
  equipmentCollection: {
      __typename?: "Equipment";
      title: string;
  }[];
  eventCollection: {
    __typename?: "Event";
    title: string;
  }[];
  fundingCollection: {
    __typename?: "Funding";
    title: string;
  }[];
  serviceCollection: {
    __typename?: "Service";
    title: string;
  }[];
  softwareCollection: {
    __typename?: "Software";
    title: string;
  }[];
  subHubCollection: {
    __typename?: "SubHub";
    title: string;
  }[];
}

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
  public allTitles$: Observable<PageTitles>;
  
  constructor(
    private allPageTitlesGQL: AllPageTitlesGQL,
  ) {
    this.allTitles$ = this.getAllPageTitles();
  }

  private getAllPageTitles() {
    try {
      return this.allPageTitlesGQL.fetch()
        .pipe(pluck('data')).pipe(
          map(({articleCollection, caseStudyCollection, equipmentCollection, eventCollection, fundingCollection, serviceCollection, softwareCollection, subHubCollection}) => ({
            articleCollection: articleCollection.items,
            caseStudyCollection: caseStudyCollection.items,
            equipmentCollection: equipmentCollection.items,
            eventCollection: eventCollection.items,
            fundingCollection: fundingCollection.items,
            serviceCollection: serviceCollection.items,
            softwareCollection: softwareCollection.items,
            subHubCollection: subHubCollection.items          
          }))          
        )
    } catch (e) { console.error('Error loading all page titles:', e) };
  }

  public getAutocompleteTerms(): string[] {
    return this.popularSearches;
  }
}
