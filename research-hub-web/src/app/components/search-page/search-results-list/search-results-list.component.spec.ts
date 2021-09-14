import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider, MockModule, MockPipe, MockComponent } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { SearchResultsListComponent } from './search-results-list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipHarness } from '@angular/material/chips/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

describe('SearchResultsListComponent', () => {
  let component: SearchResultsListComponent;
  let fixture: ComponentFixture<SearchResultsListComponent>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchResultsListComponent,
        MockPipe(ContentTypeDisplayNamePipe),
        MockComponent(NgxSkeletonLoaderComponent)
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        RouterTestingModule.withRoutes([]),
        MockModule(MatListModule),
        MatChipsModule
      ],
      providers: [
        MockProvider(SearchBarService),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.searchResults = {
      totalResults: 1,
      results: [
        {
          chips: [
            { id: 'abc', name: 'test category 1' },
            { id: 'def', name: 'test category 2' }
          ],
          contentType: 'article',
          slug: 'test-article',
          ssoProtected: false,
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

  it('should show results chips', async () => {
    const cardLoader = await loader.getChildLoader('.card-content');
    const chips = await cardLoader.getAllHarnesses(MatChipHarness);

    expect(chips.length).toBe(component.searchResults.results[0].chips.length);
  });
});
