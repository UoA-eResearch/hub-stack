import { Component, OnInit } from '@angular/core';
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
  
  constructor() {}

  getQueryParams(activity) {
    return { researchActivityId: [activity.id] };
  }

  ngOnInit() {
  }
}
