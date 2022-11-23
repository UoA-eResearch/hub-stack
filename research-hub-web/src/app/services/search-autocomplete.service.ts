import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPageTitlesGQL, Maybe } from '@app/graphql/schema';
import { pluck, map } from 'rxjs/operators';
import { notEmpty } from '@app/global/notEmpty';

export interface PageTitles {
  articleTitles: string[];
  capabilityTitles: string[];
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

  public getAllPageTitles(): Observable<PageTitles> {
    return this.allPageTitlesGQL.fetch()
      .pipe(
        map(result => ({
          articleTitles: result?.data?.articleCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          capabilityTitles: result?.data?.capabilityCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          caseStudyTitles: result?.data?.caseStudyCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          equipmentTitles: result?.data?.equipmentCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          eventTitles: result?.data?.eventCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          fundingTitles: result?.data?.fundingCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          serviceTitles: result?.data?.serviceCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          softwareTitles: result?.data?.softwareCollection?.items.map(x => x?.title).filter(notEmpty) ?? [],
          subHubTitles: result?.data?.subHubCollection?.items.map(x => x?.title).filter(notEmpty) ?? []
        }))
      )
  }

  public getAutocompleteTerms(): string[] {
    return this.popularSearches;
  }
}
