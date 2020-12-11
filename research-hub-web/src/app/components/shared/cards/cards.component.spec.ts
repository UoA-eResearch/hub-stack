import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  const mockTitle = "Organisations";
  const mockCollection = {
    "title": "Test - The First Order",
      "summary": "The First Order, also known simply as the Order, was an autocratic military junta that formed from remnants of the Galactic Empire during the New Republic Era.",
      "__typename": "OrganisationalUnit",
      "slug": "first-order"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    component.title = mockTitle;
    component.contentItem = mockCollection;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
