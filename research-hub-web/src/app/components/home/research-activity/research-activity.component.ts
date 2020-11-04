import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';

enum ResearchActivityId {
  PlanDesign = 1,
  CreateCollectCapture,
  AnalyzeInterpret,
  PublishReport,
  DiscoverReuse
}
enum OptionType {
  ResearchActivity = 1,
  Category,
  Menu
}

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {
  constructor(public analyticsService: AnalyticsService) {}

  researchActivityOptions = [
    {
      id: ResearchActivityId.PlanDesign,
      name: 'Plan & Design',
      className: 'plan',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.CreateCollectCapture,
      name: 'Create, Collect & Capture',
      className: 'create',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.AnalyzeInterpret,
      name: 'Analyze & Interpret',
      className: 'analyze',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.PublishReport,
      name: 'Publish & Report',
      className: 'publish',
      type: OptionType.ResearchActivity
    },
    {
      id: ResearchActivityId.DiscoverReuse,
      name: 'Discover & Reuse',
      className: 'discover',
      type: OptionType.ResearchActivity
    }
  ];

  getQueryParams(activity) {
    return { researchActivityId: [activity.id] };
  }

  ngOnInit() {
  }
}
