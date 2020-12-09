import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryInlineComponent } from './entry-inline.component';

describe('EntryInlineComponent', () => {
  let component: EntryInlineComponent;
  let fixture: ComponentFixture<EntryInlineComponent>;

  const mockEntry= {
    "title": "Test - First article",
      "slug": "first-article",
      "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.",
      "__typename": "CaseStudy"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryInlineComponent);
    component = fixture.componentInstance;
    component.contentItem = mockEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
