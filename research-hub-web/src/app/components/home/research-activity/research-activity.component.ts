import { Component, OnInit } from '@angular/core';
import { OptionsService } from '@services/options.service';
import { AnalyticsService } from '@services/analytics.service';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {

  constructor(public optionsService: OptionsService, public analyticsService: AnalyticsService) {

  }

  getQueryParams(activity) {
    return { researchActivityIds: [activity.id] };
  }

  ngOnInit() {
  }
}
