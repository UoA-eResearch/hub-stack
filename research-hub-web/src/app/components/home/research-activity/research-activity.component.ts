import { Component, OnInit } from '@angular/core';
import { researchActivityOptions } from '@app/global/global-variables';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent {
  public title = 'Research Activities';
  public description = 'The research lifecycle describes the research journey from project inception to completion. It highlights five project stages. Below you can explore what the University of Auckland provides to support you according to where you are in your research journey.';
  public researchActivityOptions = researchActivityOptions;
  
  constructor() {}

  getQueryParams(activity) {
    return { researchActivityId: [activity.slug] };
  }
}