import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { SearchBarComponent } from '../layout/search-bar/search-bar.component';
import { SearchService } from '@services/search.service';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SearchFilterBarComponent } from './search-filter-bar/search-filter-bar.component';
import { SearchPageComponent } from './search-page.component';
import { SearchResultsListComponent } from './search-results-list/search-results-list.component';
import { PageTitleService } from '@services/page-title.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/app.shared.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  const query = 'test';
  const cat = 'abc';
  const ra = 'def';
  const org = 'ghi';
  const sort = 'relevance';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchPageComponent,
        MockComponent(NgxSkeletonLoaderComponent),
        MockComponent(SearchBarComponent),
        MockComponent(BreadcrumbsComponent),
        MockComponent(SearchResultsListComponent),
        MockComponent(SearchFilterBarComponent)
      ],
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        HttpClientTestingModule,
        MockModule(MaterialModule),
        MockModule(FormsModule),
        MockModule(CommonModule),
        MockModule(SharedModule)
      ],
      providers: [
        SearchService,
        MockProvider(PageTitleService),
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
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search properties from route parameters', () => {   
    expect(component.searchText).toBe(query);
    expect(component.activeFilters).toEqual({
      category: [cat],
      stage: [ra],
      relatedOrgs: [org]
    });
    expect(component.sortOrder).toBe(sort);
  });
});
