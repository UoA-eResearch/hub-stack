import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { MockComponent, MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { SearchFilterBarComponent } from './../search-filter-bar/search-filter-bar.component';
import { IntranetSearchComponent } from './intranet-search.component';
import { IntranetSearchResultsListComponent } from './../intranet-search-results-list/intranet-search-results-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/app.shared.module';
import { SearchService } from '@services/search.service';
import { LoginService } from '@uoa/auth';
import { EMPTY, of } from 'rxjs';
import { IntranetSearchResults } from '@app/global/searchTypes';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NoResultsComponent } from '../no-results/no-results.component';

describe('IntranetSearchComponent', () => {
  let component: IntranetSearchComponent;
  let fixture: ComponentFixture<IntranetSearchComponent>;
  let searchSpy: jasmine.Spy;
  const mockResults: IntranetSearchResults = {
    totalResults: 1,
    results: [
      {
        title: 'test title',
        summary: 'test summary 2',
        url: 'https://www.google.co.nz/',
      }
    ]
  }

  const query = 'test';
  const cat = 'abc';
  const ra = 'def';
  const org = 'ghi';
  const sort = 'relevance';

  MockInstance.scope();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IntranetSearchComponent,
        MockComponent(NgxSkeletonLoaderComponent),
        MockComponent(IntranetSearchResultsListComponent),
        MockComponent(SearchFilterBarComponent),
        MockComponent(NoResultsComponent)
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MockModule(MaterialModule),
        MockModule(FormsModule),
        MockModule(CommonModule),
        MockModule(SharedModule)
      ],
      providers: [
        MockProvider(SearchService, {
          searchIntranet: () => of(mockResults)
        }),
        MockProvider(LoginService),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({
              q: query,
              cat: cat,
              ra: ra,
              org: org,
              sort: sort
            })),
          },
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    MockInstance(LoginService, (instance) => {
      instance.isAuthenticated = jasmine.createSpy().and.returnValue(Promise.resolve(false));
      instance.loggedIn$ = of(false);
      instance.userInfo$ = EMPTY;
    });

    fixture = TestBed.createComponent(IntranetSearchComponent);
    component = fixture.componentInstance;

    searchSpy = spyOn(component, 'search').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initial search properties should be undefined', () => {   
    expect(component.searchText).toBeUndefined();
    expect(component.activeFilters).toBeUndefined();
    expect(component.sortOrder).toBeUndefined();
    expect(component.searchResults.length).toBe(0);
    expect(component.totalResults).toBeUndefined();
  });

  it('#search should update search variables', () => {   
    component.search();

    expect(component.searchText).toBe(query);
    expect(component.activeFilters).toEqual({
      category: [cat],
      stage: [ra],
      relatedOrgs: [org]
    });
    expect(component.sortOrder).toBe(sort);
  });

  it('#search should set search results and total results', () => {   
    component.search();

    expect(component.totalResults).toBe(mockResults.totalResults);
    expect(component.searchResults).toBe(mockResults.results);
  });

  it('should not call intranet search if not logged in', (done) => {
    component.loggedIn$.subscribe(loggedIn => {
      expect(loggedIn).toBe(false);
      expect(searchSpy).not.toHaveBeenCalled();
      done();
    });
  });
});
