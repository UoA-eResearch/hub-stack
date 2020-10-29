import { Component } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-study',
  templateUrl: './user-study.component.html',
  styleUrls: ['./user-study.component.scss']
})
export class UserStudyComponent {

  constructor(public analyticsService: AnalyticsService, public location: Location) {
  }
}
