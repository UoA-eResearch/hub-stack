import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseStudyComponent } from './case-study.component';

describe('CaseStudyComponent', () => {
  let component: CaseStudyComponent;
  let fixture: ComponentFixture<CaseStudyComponent>;

  const mockCaseStudy = {
    "title": "Test - First article",
      "slug": "first-article",
      "summary": "A brief description of the first article. I'm writing some more stuff here just so that this seems a little more realistic. Sam was here. Have a good day.",
      "mainImage": {
        "url": "https://images.ctfassets.net/vbuxn5csp0ik/014fpqFg0KmnP8NWc9Jyxe/0a1a14a6a0dd438443f70d5f917568fc/Screen_Shot_2020-07-23_at_3.12.46_PM.png"
      },
      "__typename": "CaseStudy"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyComponent);
    component = fixture.componentInstance;
    component.contentItem = mockCaseStudy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
