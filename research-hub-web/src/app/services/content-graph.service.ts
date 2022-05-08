import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';
import { LinkObject, NodeObject } from 'force-graph';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContentNode extends NodeObject {
  id: string,
  name: string,
  slug: string,
  type: string,
  neighbours?: ContentNode[],
  linkedFrom?: ContentNode[],
  linksTo?: ContentNode[],
  links?: ContentLink[],
  color?: string
}

export interface ContentLink extends LinkObject {
  source: string,
  target: string
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
    return this.http.get(environment.graphUrl).pipe(
      map(result => result as ContentGraph)
    );
  }
}
