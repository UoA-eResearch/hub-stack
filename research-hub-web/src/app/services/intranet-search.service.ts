import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { IntranetSearchQuery, IntranetSearchResult, IntranetSearchResults, SortOrder } from '@app/global/searchTypes';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class IntranetSearchService {

  constructor(
    private http: HttpClient,
    private searchService: SearchService
  ) { }

  public search(query: IntranetSearchQuery): Observable<IntranetSearchResults> {
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

  private updateSearchSubjects(query: IntranetSearchQuery) {
    this.searchService.searchText.next(query.query);
  }
}
