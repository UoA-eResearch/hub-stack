import { Component, Input, OnInit } from '@angular/core';
import { Process, Article, Capability, CaseStudy, Equipment, Event, Funding, GetAssetByIdGQL, Service, Software, SubHub } from '@app/graphql/schema';
import { map, Observable } from 'rxjs';

export type PossibleContentItems
  = Article
  | SubHub
  | CaseStudy
  | Equipment
  | Event
  | Funding
  | Service
  | Software
  | Capability
  | Process

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: [
    './standard-card.component.scss',
    '../cards-common.scss'
  ]
})
export class StandardCardComponent implements OnInit {
  @Input() contentItem: PossibleContentItems;
  @Input() isSubhubChild = false;

  defaultImageUrl$: Observable<string>;
  url: string | null | undefined;

  private readonly fallbackUrl = 'https://images.ctfassets.net/vbuxn5csp0ik/7dPrwEcbk56xKfz5zTLvEP/0efddb4b6c9e1eda80d2fb8d1ee47275/card-background-article.png';

  private readonly defaultImageId: Record<Exclude<PossibleContentItems['__typename'], undefined>, string> = {
    'Process': '2B5LyjdIcdxregO7TQ8G7F',
    'Article': '7dPrwEcbk56xKfz5zTLvEP',
    'Capability': 'QT1QGR7KkqaSswnmg7L97',
    'CaseStudy': '2qmi1RS1lZSgXj9xP47h8E',
    'Equipment': '1aSspX7erQzo9jVKStvwO9',
    'Event': 'lwzGPgcdAAwSIR7PruzdG',
    'Funding': '3n0YDaiEq2xCtp8sols7LG',
    'Service': '5NwXkH2EEsYbGj20IefKyp',
    'Software': '16eyRnz65svAAyUF08yfAZ',
    'SubHub': '4A7fKybLu0221iqacf7BAz'
  }

  constructor(private getAssetById: GetAssetByIdGQL) { }

  ngOnInit(): void {
    this.url = this.contentItem.banner?.url;
    this.defaultImageUrl$ = this.getDefaultImageUrl(this.contentItem.__typename);
  }

  private getDefaultImageUrl(type: PossibleContentItems['__typename']): Observable<string> {
    if (!type) {
      type = 'Article';
    }
    const id = this.defaultImageId[type];
    return this.getAssetById.fetch({ id }).pipe(
      map(result => result.data.asset?.url ? result.data.asset.url : this.fallbackUrl),
    )
  }
}
