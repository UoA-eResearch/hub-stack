import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResearchHubApiService, PeopleParams} from 'app/services/research-hub-api.service';
import {OrgUnit} from 'app/model/OrgUnit';
import { Location } from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';
import {AppComponentService} from '../../app.component.service';
import {RoleTypeId} from '../../services/options.service';


@Component({
  selector: 'app-org-unit-details',
  templateUrl: './org-unit-details.component.html',
  styleUrls: ['./org-unit-details.component.scss']
})
export class OrgUnitDetailsComponent implements OnInit {

  public orgUnit: OrgUnit;
  userSupport: ListItem[];

  constructor(private route: ActivatedRoute, private apiService: ResearchHubApiService,
              private location: Location, private analyticsService: AnalyticsService,
              private appComponentService: AppComponentService) {

  }

  trackAction() {
    this.analyticsService.trackActionExternal('OrgUnit', this.orgUnit.name, this.orgUnit.url);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['orgUnitId'];

      this.apiService.getOrgUnit(id).subscribe(
        orgUnit => {
          const url = this.location.path();
          const name = orgUnit.name;

          this.appComponentService.setTitle(name);

          this.analyticsService.trackOrgUnit(name, url);
          this.orgUnit = orgUnit;
        }
      );

      const peopleParams = new PeopleParams();
      peopleParams.setOrgUnits([id]);
      peopleParams.setRoleTypes([RoleTypeId.UserSupport]);
      this.apiService.getPeople(peopleParams).subscribe(people => {
        this.userSupport = people.content;
      });
    });
  }
}
