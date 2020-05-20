import {Component} from '@angular/core';
import {AnalyticsService} from 'app/services/analytics.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  constructor(public analyticsService: AnalyticsService, public location: Location) {
  }
}
