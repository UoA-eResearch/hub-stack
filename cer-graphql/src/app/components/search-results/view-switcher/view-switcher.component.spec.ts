import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewSwitcherComponent } from './view-switcher.component';
import { AnalyticsService } from '@services/analytics.service';

describe('ViewSwitcherComponent', () => {
  let component: ViewSwitcherComponent;
  let fixture: ComponentFixture<ViewSwitcherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSwitcherComponent],
      providers: [
        AnalyticsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
