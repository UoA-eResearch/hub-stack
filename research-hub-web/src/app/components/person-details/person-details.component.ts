import { Component, OnInit } from '@angular/core';
import { ResearchHubApiService, ContentItemsParams } from '@services/research-hub-api.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@model/Person';
import { Location } from '@angular/common';
import { AnalyticsService } from '@services/analytics.service';
import { ListItem } from '@model/ListItem';
import { AppComponentService } from '@app/app.component.service';
import { RoleTypeId, CategoryId } from '@app/global/global-variables';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  categoryIdPerson = CategoryId.Person;
  supportedContent: ListItem[];

  constructor(private route: ActivatedRoute, public apiService: ResearchHubApiService,
    private location: Location, public analyticsService: AnalyticsService,
    private appComponentService: AppComponentService) {

  }

  trackAction() {
    this.analyticsService.trackActionExternal('Person', this.person.firstName + ' ' + this.person.lastName, this.person.directoryUrl);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['personId'];

      this.apiService.getPerson(id).subscribe(
        person => {
          const url = this.location.path();
          const name = person.firstName + ' ' + person.lastName;

          this.appComponentService.setTitle(name);
          this.analyticsService.trackPerson(name, url);
          this.person = person;
        }
      );

      const contentItemsParams = new ContentItemsParams();
      contentItemsParams.setPeople([id]);
      contentItemsParams.setRoleTypes([RoleTypeId.UserSupport]);
      this.apiService.getContentItems(contentItemsParams).subscribe(contentItems => {
        this.supportedContent = contentItems.content;
      });
    });
  }
}
