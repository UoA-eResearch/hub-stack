import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { IntranetSearchQuery, IntranetSearchResult, IntranetSearchResults, SearchFilters, SearchQuery, SearchResult, SearchResults, SortOrder } from '@app/global/searchTypes';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchFilters: BehaviorSubject<SearchFilters> = new BehaviorSubject<SearchFilters>({ category: [], stage: [], relatedOrgs: [] });

  constructor(
    private http: HttpClient
  ) { }

  public search(query: SearchQuery): Observable<SearchResults> {
    return this.http.post(
      environment.searchUrl,
      query
    ).pipe(
      tap(() => this.updateSearchSubjects(query)),
      map(data => {
        const totalResults = data["result"]["hits"]["total"]["value"];
        const results: SearchResult[] = [];
        data["result"]["hits"]["hits"].forEach(element => {
          const summary = element.highlight?.["fields.summary.en-US"] ?
            element.highlight["fields.summary.en-US"].join(' '):
            (element._source?.fields?.summary && element._source?.fields?.summary["en-US"]) ? 
            element._source.fields.summary["en-US"] : '';

          const result: SearchResult = {
            title: element._source.fields.title["en-US"],
            summary: summary,
            slug: element._source.fields.slug["en-US"],
            ssoProtected: element._source.fields.ssoProtected["en-US"],
            contentType: element._source.sys.contentType.sys.id,
            chips: element._source.fields.category?.["en-US"].map(x => {
              return { name: x.name, id: x.sys.id };
            })
          };

          results.push(result);
        });

        const searchResults: SearchResults = {
          totalResults,
          results
        }

        return searchResults;
      }),
      tap((results) => this.pushToDataLayer(query.query, results.totalResults))
    );
  }

  public searchIntranet(query: IntranetSearchQuery): Observable<IntranetSearchResults> {
    return this.http.post(
      environment.intranetSearchUrl,
      query
    ).pipe(
      tap(() => this.updateSearchSubjects(query)),
      map(data => {
        const totalResults = data["result"]["info"]["page"]["total_result_count"];
        const results: IntranetSearchResult[] = [];
        data["result"]["records"]["page"].forEach(element => {
          const length: number = 200;
          const body: string = element.body.length > length ? element.body.substring(0, length - 3) + "..." : element.body.substring(0, length);
          
          const result: IntranetSearchResult = {
            title: element.title,
            summary: body,
            url: element.url
          };

          results.push(result);
        });

        const searchResults: IntranetSearchResults = {
          totalResults,
          results
        }

        return searchResults;
      })
    );
  }

  public generateQueryParams(searchText: string, filters?: SearchFilters, sortOrder?: SortOrder): Params {
    const params: Params = {
      q: searchText,
    }

    if (filters) {
      if (filters.category?.length > 0) {
        params.cat = filters.category
      }
      if (filters.relatedOrgs?.length > 0) {
        params.org = filters.relatedOrgs
      }
      if (filters.stage?.length > 0) {
        params.ra = filters.stage
      }
    }
    
    if (sortOrder) {
      params.sort = sortOrder
    }

    return params;
  }

  private updateSearchSubjects(query: SearchQuery | IntranetSearchQuery) {
    this.searchText.next(query.query);
    if ('filters' in query) this.searchFilters.next(Object.assign({}, query.filters));
  }

  private pushToDataLayer(query: string, totalResults: number) {
    // Push to Tag Manager
    window.dataLayer.push({
      event: 'search',
      searchQuery: query,
      resultsTotal: totalResults
    });
  }
}
