import { Component, Input } from '@angular/core';
import { Article, CaseStudy, Equipment, Event, Funding, Service, Software, SubHub } from '@app/graphql/schema';

export type PossibleContentItems
  = Article
  | SubHub
  | CaseStudy
  | Equipment
  | Event
  | Funding
  | Service
  | Software

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: [
    './standard-card.component.scss',
    '../cards-common.scss'
  ]
})
export class StandardCardComponent {
  @Input() contentItem: PossibleContentItems;
  @Input() isSubhubChild = false;

  public defaultImage = new Map<Exclude<PossibleContentItems['__typename'], undefined>, string>([
    ['Article', 'https://images.ctfassets.net/vbuxn5csp0ik/7dPrwEcbk56xKfz5zTLvEP/0efddb4b6c9e1eda80d2fb8d1ee47275/card-background-article.png'],
    ['CaseStudy', 'https://images.ctfassets.net/vbuxn5csp0ik/2qmi1RS1lZSgXj9xP47h8E/54eb4e54bfc00d26f34401293af1ed80/card-background-case-study.png'],
    ['Equipment', 'https://images.ctfassets.net/vbuxn5csp0ik/1aSspX7erQzo9jVKStvwO9/6b141535dc463e8af1394f269100b9d7/card-background-equipment.png'],
    ['Event', 'https://images.ctfassets.net/vbuxn5csp0ik/lwzGPgcdAAwSIR7PruzdG/de3e9093f3504a0e64d12a7751d5752e/card-background-event.png'],
    ['Funding', 'https://images.ctfassets.net/vbuxn5csp0ik/3n0YDaiEq2xCtp8sols7LG/2ff1b20bb49bfc0da132f2500c8ab0eb/card-background-funding.png'],
    ['Service', 'https://images.ctfassets.net/vbuxn5csp0ik/5NwXkH2EEsYbGj20IefKyp/102be11747b9de2e07980926e4498d27/card-background-service.png'],
    ['Software', 'https://images.ctfassets.net/vbuxn5csp0ik/16eyRnz65svAAyUF08yfAZ/ea0cff6e1c51e1800e7d210168532516/card-background-software.png'],
    ['SubHub', 'https://images.ctfassets.net/vbuxn5csp0ik/4A7fKybLu0221iqacf7BAz/df2882a80873bea2e3297e7ebc3f6f41/card-background-subhub.png']
  ]);

  constructor() { }
}
