import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyListComponent } from './case-study-list.component';

describe('CaseStudyListComponent', () => {
  let component: CaseStudyListComponent;
  let fixture: ComponentFixture<CaseStudyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStudyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
