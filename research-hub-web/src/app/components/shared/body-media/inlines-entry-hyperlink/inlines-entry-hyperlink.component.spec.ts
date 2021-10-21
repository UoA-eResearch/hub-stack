import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlinesEntryHyperlinkComponent } from './inlines-entry-hyperlink.component';

describe('InlinesEntryHyperlinkComponent', () => {
  let component: InlinesEntryHyperlinkComponent;
  let fixture: ComponentFixture<InlinesEntryHyperlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesEntryHyperlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlinesEntryHyperlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
