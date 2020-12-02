import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@services/analytics.service';
import { Location } from '@angular/common';
import { AppComponentService } from '../../app.component.service';


@Component({
  selector: 'app-user-study',
  templateUrl: './user-study.component.html',
  styleUrls: ['./user-study.component.scss']
})
export class UserStudyComponent implements OnInit {
  public title: String = "User Study";
  public summary: String = "We appreciate your visit to the beta-version of the ResearchHub, our platform for research support.";
  public coverImageUrl: String = 'url(assets/images/banner19.jpg)';
  
  constructor(
    public analyticsService: AnalyticsService, 
    public location: Location,
    public appComponentService: AppComponentService) {
  }

  async ngOnInit() {
    this.appComponentService.setTitle('User Study');
  }
}
