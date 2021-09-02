import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from '@apollo/client/utilities';
import { MaterialModule } from '@app/app.material.module';
import { SearchFilters, SearchQuery, SearchResult, SearchResults } from '@app/global/searchTypes';
import { SearchService } from '@services/search.service';
import { MockModule, MockProvider  } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

import { SearchBarComponent } from './search-bar.component';

xdescribe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    const searchText$ = new BehaviorSubject<string>('');
    const searchFilters$ = new BehaviorSubject<SearchFilters>({category: [], relatedOrgs: [], stage: []});

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MockModule(MaterialModule)
      ],
      declarations: [
        SearchBarComponent,
        SearchFiltersComponent
      ],
      providers: [
        MockProvider(SearchService, {
          searchText: searchText$,
          searchFilters: searchFilters$
        }),
        MockProvider(BreakpointObserver)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
