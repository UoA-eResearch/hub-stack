import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntranetSearchResultsListComponent } from './intranet-search-results-list.component';

describe('IntranetSearchResultsListComponent', () => {
  let component: IntranetSearchResultsListComponent;
  let fixture: ComponentFixture<IntranetSearchResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntranetSearchResultsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetSearchResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
