import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { SearchBarComponent } from '../../layout/search-bar/search-bar.component';
import { SearchService } from '@services/search.service';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';
import { SearchFilterBarComponent } from '../search-filter-bar/search-filter-bar.component';
import { SearchComponent } from './search.component';
import { SearchResultsListComponent } from '../search-results-list/search-results-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/app.shared.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NoResultsComponent } from '../no-results/no-results.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const query = 'test';
  const cat = 'abc';
  const ra = 'def';
  const org = 'ghi';
  const sort = 'relevance';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        MockComponent(NgxSkeletonLoaderComponent),
        MockComponent(SearchBarComponent),
        MockComponent(BreadcrumbsComponent),
        MockComponent(SearchResultsListComponent),
        MockComponent(SearchFilterBarComponent),
        MockComponent(NoResultsComponent)
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
    fixture = TestBed.createComponent(SearchComponent);
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
