import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingPurposeComponent } from './funding-purpose.component';

describe('FundingPurposeComponent', () => {
  let component: FundingPurposeComponent;
  let fixture: ComponentFixture<FundingPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingPurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
