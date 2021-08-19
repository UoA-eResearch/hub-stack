import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(
    private http: HttpClient
  ) { }

  public search(query: SearchQuery): Observable<SearchResult[]> {
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
}
