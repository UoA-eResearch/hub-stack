import { BreakpointObserver } from '@angular/cdk/layout';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatBadgeHarness } from '@angular/material/badge/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '@services/search.service';
import { PageTitles, SearchAutocompleteService } from '@services/search-autocomplete.service';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { EMPTY, of } from 'rxjs';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';

import { SearchBarComponent } from './search-bar.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  let loader: HarnessLoader;
  let router: Router;

  const pageTitles: PageTitles = {
    articleTitles: ['an article'],
    caseStudyTitles: ['a caseStudy'],
    equipmentTitles: ['an equipment'],
    eventTitles: ['an event'],
    fundingTitles: ['a funding'],
    serviceTitles: ['a service'],
    softwareTitles: ['a software'],
    subHubTitles: ['a subHub']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatBadgeModule,
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      declarations: [
        SearchBarComponent,
        MockComponent(SearchFiltersComponent)
      ],
      providers: [
        MockProvider(SearchService, {
          generateQueryParams: () => {
            return {
              q: 'test',
              cat: ['abc'],
              org: ['def'],
              ra: ['ghi'],
              sort: 'relevance'
            }
          }
        }),
        MockProvider(SearchAutocompleteService, {
          allTitles$: of(pageTitles),
          getAutocompleteTerms: () => {return ['Covfefé']}
        }),
        MockProvider(BreakpointObserver, {
          observe: () => EMPTY
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keydown.enter on search field should navigate to search page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const input = fixture.debugElement.query(By.css('input'));

    expect(input)
      .withContext('there should be an input field')
      .toBeTruthy();

    input.triggerEventHandler('keydown.enter', {});

    expect(navigateSpy).toHaveBeenCalledWith(['/search'], {
      queryParams: {
        q: 'test',
        cat: ['abc'],
        org: ['def'],
        ra: ['ghi'],
        sort: 'relevance'
      }
    });
  })

  it('clicking search button should navigate to search page', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = await loader.getHarness(MatButtonHarness.with({ text: 'search' }));

    expect(button)
      .withContext('there should be a search button')
      .toBeTruthy();
    await button.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/search'], {
      queryParams: {
        q: 'test',
        cat: ['abc'],
        org: ['def'],
        ra: ['ghi'],
        sort: 'relevance'
      }
    });
  });

  it('clicking settings button should open filters panel', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({ selector: '#settingsButton' }));

    expect(button)
      .withContext('there should be a settings button')
      .toBeTruthy();
    await button.click();

    fixture.detectChanges();

    expect(component.showFilters).toBeTrue();
  });

  it('should count active filters', () => {
    component.activeFilters = { category: ['abc', 'def'], stage: ['ghi'], relatedOrgs: ['jkl'] };
    fixture.detectChanges();

    expect(component.countActiveFilters()).toBe(4);
  });

  it('setting filters should show badge with number of filters applied', async () => {
    component.activeFilters = { category: ['abc'], stage: [], relatedOrgs: [] };
    fixture.detectChanges();

    const badge = await loader.getHarness(MatBadgeHarness);

    expect(badge)
      .withContext('there should be a badge when filters are set')
      .toBeTruthy();

    expect(await badge.getText()).toBe('1');
  });

  it('On mobile, clicking the search button should show mobile search', async () => {
    component.isMobile = true;
    fixture.detectChanges();

    const button = await loader.getHarness(MatButtonHarness.with({ text: 'search' }));

    expect(button)
      .withContext('there should be a mobile search button')
      .toBeTruthy();

    await button.click();
    fixture.detectChanges();

    expect(component.showMobileSearch).toBeTrue();
  });

  it('On mobile, when showing search, filters should be visible', () => {
    component.isMobile = true;
    component.toggleMobileSearch();
    fixture.detectChanges();

    expect(component.showFilters).toBeTrue();
  });

  it('On mobile, the back button should close the search interface', async () => {
    component.isMobile = true;
    component.toggleMobileSearch();
    fixture.detectChanges();

    const button = await loader.getHarness(MatButtonHarness.with({selector: '#searchBackButton'}));

    expect(button)
      .withContext('back button should exist')
      .toBeTruthy();

    await button.click();

    expect(!component.showMobileSearch && !component.showFilters).toBeTrue()
  })

  it('Should get the autocomplete terms from the autocomplete service', async () => {
    await fixture.whenStable();
    let filteredTerms: string[];

    component.filteredTerms.subscribe((terms) => filteredTerms = terms);
    expect(filteredTerms.length).toBe(9);
  });

  it('Should filter autocomplete terms correctly', async () => {
    await fixture.whenStable();
    let filteredTerms: string[];

    component.filteredTerms.subscribe((terms) => filteredTerms = terms);

    const input = await loader.getHarness(MatAutocompleteHarness.with({selector: '#search'}));
    await input.enterText('covfefe');

    expect(filteredTerms.length).toBe(1);
  });
});
