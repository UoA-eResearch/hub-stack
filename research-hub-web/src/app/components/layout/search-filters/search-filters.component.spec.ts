import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { MockModule } from 'ng-mocks';
import { SearchFiltersComponent } from './search-filters.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { MatSelectionListHarness } from '@angular/material/list/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { Category } from '@app/graphql/schema';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;
  let loader: HarnessLoader

  const allCategoriesStub: Category[] = [
    {
      sys: {
        id: 'testcategory 1',
        environmentId: '',
        firstPublishedAt: null,
        publishedAt: null,
        publishedVersion: null,
        spaceId: '',
        __typename: 'Sys'
      },
      name: 'test Category 1',
      description: '',
      displayOrder: 0,
      contentfulMetadata: {
        tags: []
      },
      __typename: 'Category',
      linkedFrom: null,
      maoriName: null
    },
    {
      sys: {
        id: 'testcategory 2',
        environmentId: '',
        firstPublishedAt: null,
        publishedAt: null,
        publishedVersion: null,
        spaceId: '',
        __typename: 'Sys'
      },
      name: 'test Category 2',
      description: '',
      displayOrder: 0,
      contentfulMetadata: {
        tags: []
      },
      __typename: 'Category',
      linkedFrom: null,
      maoriName: null
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFiltersComponent],
      imports: [
        ApolloTestingModule,
        MatListModule,
        FormsModule,
        MockModule(MatTabsModule),
        MockModule(MatChipsModule),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#clearFilters should reset all filters', () => {
    expect(component.activeFilters)
      .withContext('filters should be empty at first')
      .toEqual({ category: [], stage: [], relatedOrgs: [] });

    component.activeFilters = { category: ['abc'], stage: ['def'], relatedOrgs: ['ghi'] };
    component.clearFilters();

    expect(component.activeFilters)
      .toEqual({ category: [], stage: [], relatedOrgs: [] });
  });

  it('selecting filter should set activeFilters', async () => {
    component.allCategories = allCategoriesStub;
    const selectionList = await loader.getHarness(MatSelectionListHarness);
    const items = await selectionList.getItems({ text: allCategoriesStub[0].name });
    await items[0].select();

    expect(component.activeFilters).toEqual({ category: [allCategoriesStub[0].sys.id], stage: [], relatedOrgs: [] });
  });

  it('deselecting filters should change activeFilters', async () => {
    component.allCategories = allCategoriesStub;
    component.activeFilters = {category: [allCategoriesStub[0].sys.id], stage: [], relatedOrgs: []}
    const selectionList = await loader.getHarness(MatSelectionListHarness);
    const items = await selectionList.getItems({selected: true});

    expect(items.length)
      .withContext('setting activeFilters input should select mat-selection-list items')
      .toBeGreaterThan(0);

    await parallel(() => items.map(item => item.toggle()));

    expect(component.activeFilters).toEqual({category: [], stage: [], relatedOrgs: []});
  })

  it('clicking search button should send filters to output', async () => {
    spyOn(component.search, 'emit');

    const button = await loader.getHarness(MatButtonHarness);
    const text = await button.getText();

    expect(text)
      .withContext('there should be a button with text "Search"')
      .toBe('Search');

    await button.click();

    expect(component.search.emit).toHaveBeenCalled();
  });
});
