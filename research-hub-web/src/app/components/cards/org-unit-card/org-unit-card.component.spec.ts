import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitCardComponent } from './org-unit-card.component';

describe('OrgUnitCardComponent', () => {
  let component: OrgUnitCardComponent;
  let fixture: ComponentFixture<OrgUnitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgUnitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
