import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlinesAssetHyperlinkComponent } from './inlines-asset-hyperlink.component';

describe('InlinesAssetHyperlinkComponent', () => {
  let component: InlinesAssetHyperlinkComponent;
  let fixture: ComponentFixture<InlinesAssetHyperlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinesAssetHyperlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlinesAssetHyperlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
