import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule, MockComponent } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IntranetSearchResultsListComponent } from './intranet-search-results-list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

describe('IntranetSearchResultsListComponent', () => {
  let component: IntranetSearchResultsListComponent;
  let fixture: ComponentFixture<IntranetSearchResultsListComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IntranetSearchResultsListComponent,
        MockComponent(NgxSkeletonLoaderComponent)
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MockModule(MatListModule),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetSearchResultsListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.searchResults = {
      totalResults: 1,
      results: [
        {
          url: 'https://www.google.co.nz/',
          summary: 'test summary',
          title: 'test title'
        }
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skeleton when loading', () => {
    const noLoading = fixture.debugElement.query(By.css('.skeleton-wrapper'));
    expect(noLoading).toBeNull();

    component.loading = true;
    fixture.detectChanges();

    const withLoading = fixture.debugElement.query(By.css('.skeleton-wrapper'));
    expect(withLoading).toBeTruthy();
  });

  it('should show 1 results card for each search result', async () => {
    const cards = await loader.getAllHarnesses(MatCardHarness.with({selector: '.card-content'}));

    expect(cards.length).toBe(component.searchResults.totalResults);
  });
});