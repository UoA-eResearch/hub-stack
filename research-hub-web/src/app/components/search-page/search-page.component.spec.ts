import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/app.material.module';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchBarService } from '../search-bar/search-bar.service';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SearchFilterBarComponent } from './search-filter-bar/search-filter-bar.component';
import { SearchPageComponent } from './search-page.component';
import { SearchResultsListComponent } from './search-results-list/search-results-list.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

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
      ],
      providers: [
        SearchBarService
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
});
