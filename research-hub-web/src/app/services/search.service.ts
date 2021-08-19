import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchFilters: BehaviorSubject<SearchFilters> = new BehaviorSubject<SearchFilters>({});

  constructor(
    private http: HttpClient
  ) { }

  public search(query: SearchQuery): Observable<SearchResult[]> {
    this.updateSearchSubjects(query);

    return this.http.post(
      environment.searchUrl,
      query
    ).pipe(
      map(data => {
        const results: SearchResult[] = [];
        data["result"]["hits"]["hits"].forEach(element => {
          const result: SearchResult = {
            title: element._source.fields.title["en-US"],
            summary: element._source.fields.summary["en-US"],
            slug: element._source.fields.slug["en-US"],
            ssoProtected: element._source.fields.ssoProtected["en-US"],
            contentType : element._source.sys.contentType.sys.id,
            icon: element._source.fields.icon?.["en-US"]["url"]
          };

          results.push(result);
        });

        return results;
      })
    );
  }

  public generateQueryString(searchText: string, filters?: SearchFilters, sortOrder?: SortOrder): Params {
    const params: Params = {
      q: searchText,
    }

    if (filters?.category) {
      params.cat = filters.category
    }
    if (filters?.relatedOrgs) {
      params.org = filters.relatedOrgs
    }
    if (filters.stage) {
      params.ra = filters.stage
    }
    if (sortOrder) {
      params.sort = sortOrder
    }

    return params;
  }

  private updateSearchSubjects(query: SearchQuery) {
    this.searchText.next(query.query);
    this.searchFilters.next(query.filters);
  }

}
