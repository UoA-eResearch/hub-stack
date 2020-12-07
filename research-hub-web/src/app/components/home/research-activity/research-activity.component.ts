import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { 
  ResearchActivityId, 
  researchActivityOptions,
  OptionType
} from '@app/global/global-variables';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {
  public researchActivityOptions = researchActivityOptions;
  
  constructor(public analyticsService: AnalyticsService) {}

  getQueryParams(activity) {
    return { researchActivityId: [activity.id] };
  }

  ngOnInit() {
  }
}
