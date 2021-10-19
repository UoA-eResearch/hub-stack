import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksEmbeddedEntryComponent } from './blocks-embedded-entry.component';

describe('BlocksEmbeddedEntryComponent', () => {
  let component: BlocksEmbeddedEntryComponent;
  let fixture: ComponentFixture<BlocksEmbeddedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksEmbeddedEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksEmbeddedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
