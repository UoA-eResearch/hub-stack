import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryBlockComponent } from './entry-block.component';

describe('EntryBlockComponent', () => {
  let component: EntryBlockComponent;
  let fixture: ComponentFixture<EntryBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
