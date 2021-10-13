import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingListComponent } from './funding-list.component';

describe('FundingListComponent', () => {
  let component: FundingListComponent;
  let fixture: ComponentFixture<FundingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
