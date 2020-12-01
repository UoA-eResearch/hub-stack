import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEntryComponent } from './event-entry.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
