import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryInlineComponent } from './entry-inline.component';

describe('EntryInlineComponent', () => {
  let component: EntryInlineComponent;
  let fixture: ComponentFixture<EntryInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
