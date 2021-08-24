import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsListComponent } from './search-results-list.component';

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
