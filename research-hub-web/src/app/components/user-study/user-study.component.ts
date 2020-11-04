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
  constructor(
    public analyticsService: AnalyticsService, 
    public location: Location,
    public appComponentService: AppComponentService) {
  }

  async ngOnInit() {
    this.appComponentService.setTitle('User Study');
  }
}
