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
import { IntranetSearchService } from '@services/intranet-search.service';
import { LoginService } from '@uoa/auth';
import { EMPTY } from 'rxjs';

fdescribe('IntranetSearchComponent', () => {
  let component: IntranetSearchComponent;
  let fixture: ComponentFixture<IntranetSearchComponent>;
  let searchSpy: jasmine.Spy;

  beforeAll(MockInstance.remember);
  afterAll(MockInstance.restore);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IntranetSearchComponent,
        MockComponent(NgxSkeletonLoaderComponent),
        MockComponent(IntranetSearchResultsListComponent),
        MockComponent(SearchFilterBarComponent)
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
        IntranetSearchService,
        MockProvider(LoginService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    MockInstance(LoginService, (instance) => {
      instance.isAuthenticated = jasmine.createSpy().and.returnValue(Promise.resolve(false));
      instance.loggedIn$ = EMPTY;
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

  it('should not call intranet search if not logged in', async () => {
    expect(searchSpy).not.toHaveBeenCalled();
  });
});
