import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEntryComponent } from './event-entry.component';

const mockEvent = {
  "title": "Test - Handel's Messiah",
  "summary": "A Timeless Christmas Tradition",
  "banner": {
    "url": "https://images.ctfassets.net/vbuxn5csp0ik/1Arsscasl4S2QEb5lCZXv0/23ee30f89468c541cc93320e93521629/2018_Messiah_Choir.jpg"
  },
  "__typename": "Event"
};

describe('EventEntryComponent', () => {
  let component: EventEntryComponent;
  let fixture: ComponentFixture<EventEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEntryComponent);
    component = fixture.componentInstance;
    component.contentItem = mockEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
