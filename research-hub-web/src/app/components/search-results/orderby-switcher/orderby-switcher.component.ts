import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrderBy } from 'app/services/research-hub-api.service';
import { AnalyticsService } from 'app/services/analytics.service';

@Component({
  selector: 'orderby-switcher',
  templateUrl: './orderby-switcher.component.html',
  styleUrls: ['./orderby-switcher.component.scss']
})
export class OrderbySwitcherComponent implements OnInit {

  @Input()
  public relevanceDisabled : boolean;

  @Input()
  public value;

  @Output()
  valueChange: EventEmitter<OrderBy> = new EventEmitter<OrderBy>();

  public sortOptions = [{id: OrderBy.Alphabetical, name: 'Alphabet'}, {id: OrderBy.Relevance, name: 'Relevance'}];

  onSortByChange(event){
    this.valueChange.emit(event.value);
    event.value === 'alphabetical' ? this.analyticsService.trackUserExperience('Sort by', 'sort by alphabetical') : this.analyticsService.trackUserExperience('Sort by', 'sort by relevance'); 
  }

  constructor(public analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

}
