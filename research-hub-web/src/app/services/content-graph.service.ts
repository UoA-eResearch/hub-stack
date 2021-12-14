import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContentNode {
  id: string,
  name: string,
  slug: string,
  type: string
}

export interface ContentLink {
  from: string,
  to: string
}

export interface ContentGraph {
  nodes: ContentNode[],
  links: ContentLink[]
}

@Injectable({
  providedIn: 'root'
})
export class ContentGraphService {

  constructor(private http: HttpClient) { }

  public getGraph(): Observable<ContentGraph> {
    return this.http.get(environment.graphURL + '/graph').pipe(
      map(result => result as ContentGraph)
    );
  }
}
