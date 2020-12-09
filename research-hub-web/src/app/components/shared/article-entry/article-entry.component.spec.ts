import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleEntryComponent } from './article-entry.component';

describe('ArticleEntryComponent', () => {
  let component: ArticleEntryComponent;
  let fixture: ComponentFixture<ArticleEntryComponent>;

  const mockArticle = {
    "title": "Test - First article",
      "slug": "first-article",
      "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.",
      "banner": {
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/014fpqFg0KmnP8NWc9Jyxe/0a1a14a6a0dd438443f70d5f917568fc/Screen_Shot_2020-07-23_at_3.12.46_PM.png"
      },
      "__typename": "Article"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEntryComponent);
    component = fixture.componentInstance;
    component.contentItem = mockArticle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
