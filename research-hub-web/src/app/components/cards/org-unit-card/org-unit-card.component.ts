import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrgUnit } from '@app/graphql/schema';

@Component({
  selector: 'app-org-unit-card',
  templateUrl: './org-unit-card.component.html',
  styleUrls: [
    './org-unit-card.component.scss',
    '../cards-common.scss'
  ]
})
export class OrgUnitCardComponent {
  @Input() orgUnit: OrgUnit;

  constructor(
    private router: Router
  ) { }

  public navigateTo(url: string) {
    location.href = url;
  }

  public navigateTo(url: string) {
    location.href = url;
  }

}
