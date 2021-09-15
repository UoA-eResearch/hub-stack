import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { SearchFilters, SearchQuery, SearchResult, SearchResults, SortOrder } from '@app/global/searchTypes';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchFilters: BehaviorSubject<SearchFilters> = new BehaviorSubject<SearchFilters>({category: [], stage: [], relatedOrgs: []});

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
            element.highlight["fields.summary.en-US"].join(' ') :
            element._source.fields.summary["en-US"];

          const result: SearchResult = {
            title: element._source.fields.title["en-US"],
            summary: summary,
            slug: element._source.fields.slug["en-US"],
            ssoProtected: element._source.fields.ssoProtected["en-US"],
            contentType : element._source.sys.contentType.sys.id,
            chips: element._source.fields.category?.["en-US"].map(x => {
              return {name: x.name, id: x.sys.id};
            })
          };

          results.push(result);
        });

        const searchResults: SearchResults = {
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

    if (filters?.category?.length > 0) {
      params.cat = filters.category
    }
    if (filters?.relatedOrgs?.length > 0) {
      params.org = filters.relatedOrgs
    }
    if (filters?.stage?.length > 0) {
      params.ra = filters.stage
    }
    if (sortOrder) {
      params.sort = sortOrder
    }

    return params;
  }

  private updateSearchSubjects(query: SearchQuery) {
    this.searchText.next(query.query);
    this.searchFilters.next(Object.assign({}, query.filters));
  }
}
