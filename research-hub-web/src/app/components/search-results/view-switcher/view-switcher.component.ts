import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from 'app/services/analytics.service';

@Component({
  selector: 'view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.scss']
})
export class ViewSwitcherComponent implements OnInit {

  @Input()
  public showCardView : boolean;

  @Output()
  public showCardViewChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleView(){
    this.showCardViewChange.emit(!this.showCardView);
    this.showCardView ? this.analyticsService.trackUserExperience('Card view', 'show list view') : this.analyticsService.trackUserExperience('Card view', 'show card view') ;
  }

  constructor(public analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

}
