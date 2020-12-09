import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkCardComponent } from './link-card.component';

describe('LinkCardComponent', () => {
  let component: LinkCardComponent;
  let fixture: ComponentFixture<LinkCardComponent>;

  const mockEquipment = {
    "title": "Test - Death Star",
    "summary": "Mobile space station and galactic superweapon.",
    "mainImage": {
      "url": "https://images.ctfassets.net/vbuxn5csp0ik/3AJw8SICDbvLbtyRw5WEuC/fe84862c68cae153583ae8e5c1828bba/Death_star1.png"
    },
    "__typename": "Equipment"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCardComponent);
    component = fixture.componentInstance;
    component.contentItem = mockEquipment;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
