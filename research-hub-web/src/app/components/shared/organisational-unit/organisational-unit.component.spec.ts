import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationalUnitComponent } from './organisational-unit.component';

describe('OrganisationalUnitComponent', () => {
  let component: OrganisationalUnitComponent;
  let fixture: ComponentFixture<OrganisationalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
