import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganisationalUnitComponent } from './organisational-unit.component';

describe('OrganisationalUnitComponent', () => {
  let component: OrganisationalUnitComponent;
  let fixture: ComponentFixture<OrganisationalUnitComponent>;

  const mockOrgUnit = {
    "title": "Test - The First Order",
    "summary": "The First Order, also known simply as the Order, was an autocratic military junta that formed from remnants of the Galactic Empire during the New Republic Era.",
    "__typename": "OrganisationalUnit"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationalUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationalUnitComponent);
    component = fixture.componentInstance;
    component.contentItem = mockOrgUnit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
