import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEntryComponent } from './article-entry.component';

describe('ArticleEntryComponent', () => {
  let component: ArticleEntryComponent;
  let fixture: ComponentFixture<ArticleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
