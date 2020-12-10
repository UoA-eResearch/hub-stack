import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardsComponent } from './mini-cards.component';

describe('MiniCardsComponent', () => {
  let component: MiniCardsComponent;
  let fixture: ComponentFixture<MiniCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
