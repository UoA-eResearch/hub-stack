import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryBlockComponent } from './entry-block.component';

const mockEntry= {
  "title": "Test - First article",
    "slug": "first-article",
    "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.",
    "__typename": "CaseStudy"
};

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
    component.contentItem = mockEntry;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
