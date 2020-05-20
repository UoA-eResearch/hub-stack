import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsModule } from './search-results.module';
import { ServicesModule } from 'app/services/services.module';
import { SearchBarService } from '../search-bar/search-bar.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponentService } from 'app/app.component.service';
import { SearchFiltersService } from './search-filters/search-filters.service';
import { SearchResultsComponentService } from './search-results-component.service';
import { Observable } from 'rxjs';
import { SharedModule } from 'app/components/shared/app.shared.module';
import { Page } from 'app/model/Page';
import { ListItem } from 'app/model/ListItem';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

// Stub class for the search results component service.
// Currently it returns an empty page.
class SearchResultsComponentStubService {
  private emptyPage = {totalElements: 0} as Page<ListItem>;
  public results$ : Observable<Page<ListItem>> = of(this.emptyPage);
  public resultsLoading$ : Observable<boolean> = of(false);
  public resultsCategories$ : Observable<Page<ListItem>> = of(this.emptyPage);
  public resultsCategoriesLoading$ : Observable<boolean> = of(false);
  public searchWithParams(params: any){
    return;
  }
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let activatedRoute = { queryParams: of({})};

  function expectToHandleNulls(fn,expectedValue,thisArg){
    const undefinedArgs = [],
    nullArgs = [];
    // Create an array of undefined and null values for all arguments.
    for (var i = 0; i < fn.length; i++){
      undefinedArgs.push(undefined);
      nullArgs.push(null);
    }
    expect(fn.apply(thisArg,undefinedArgs)).toEqual(expectedValue,'successful and return expected value.');
    expect(fn.apply(thisArg,nullArgs)).toEqual(expectedValue,'successful and return expected value.');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule,
                 SearchResultsModule,
                 NoopAnimationsModule,
                 ServicesModule,
                 RouterTestingModule.withRoutes(
                   [{path:'', component: SearchResultsComponent}]
                 )],
      providers: [ SearchBarService,
                   AppComponentService,
                   SearchFiltersService,
                   {provide: ActivatedRoute, useValue: activatedRoute}]
    })
      .overrideModule(SearchResultsModule,{
        // Replace the real component service with our stub one.
        set: {
          providers: [
            {provide: SearchResultsComponentService, useClass:SearchResultsComponentStubService}
          ]
        }
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fromTags should handle null tags', () => {
    expectToHandleNulls(component.fromTags, [], component);
  });

  it('#setFiltersIfUndefined should handle null tags', ()=> {
    component.setFiltersTextIfUndefined(undefined,undefined).subscribe(
      (res) =>
        {
          expect(res.length).toEqual(2,"that there are two elements in the resulting array");
          expect(res[0]).toEqual([],"that the people array is empty.");
          expect(res[1]).toEqual([],"that the org unit array is empty.");
        }
    );
  });
});
