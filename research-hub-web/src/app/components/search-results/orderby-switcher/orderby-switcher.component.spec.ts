import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbySwitcherComponent } from './orderby-switcher.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../components/shared/app.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchResultsComponentService } from '../search-results-component.service';
import { ResearchHubApiService } from '../../../services/research-hub-api.service';
import { AnalyticsService } from '../../../services/analytics.service';

describe('OrderbySwitcherComponent', () => {
  let component: OrderbySwitcherComponent;
  let fixture: ComponentFixture<OrderbySwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        OrderbySwitcherComponent
      ],
      providers: [
        ResearchHubApiService,
        SearchResultsComponentService,
        AnalyticsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderbySwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
