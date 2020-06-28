import {Component, OnInit} from '@angular/core';
import {ResearchHubApiService, ContentItemsParams} from 'app/services/research-hub-api.service';
import {ActivatedRoute} from '@angular/router';
import {Person} from 'app/model/Person';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {ListItem} from '../../model/ListItem';
import {AppComponentService} from '../../app.component.service';
import {CategoryId, RoleTypeId} from '../../services/options.service';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person;
  categoryIdPerson = CategoryId.Person;
  supportedContent: ListItem[];

  constructor(private route: ActivatedRoute, private apiService: ResearchHubApiService,
              private location: Location, private analyticsService: AnalyticsService,
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
