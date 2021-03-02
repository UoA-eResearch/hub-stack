import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  AllCategoriesGQL,
  AllStagesGQL,
  AllOrganisationsGQL,
  CategoryCollection,
  OrgUnitCollection,
  StageCollection,
  AllPagesGQL,
  AllItemsByStageGQL,
  AllItemsByCategoryGQL,
  AllItemsByOrganisationGQL
} from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public allItemsByCategory$: Observable<any>;
  public allItemsByStage$: Observable<any>;
  public allItemsByOrganisation$: Observable<any>;
  public allPages$;
  public allPagesBaseArray = [];
  public allCurrentPages = [];
  public allCurrentPagesUnsorted = [];
  public categoryFilter = [];
  public stageFilter = []
  public organisationFilter = [];
  public queries;
  public params;
  public sortType;
  public pageType;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public allStagesGQL: AllStagesGQL,
    public allOrganisationsGQL: AllOrganisationsGQL,
    public allPagesGQL: AllPagesGQL,
    public allItemsByCategoryGQL: AllItemsByCategoryGQL,
    public allItemsByStageGQL: AllItemsByStageGQL,
    public allItemsByOrganisationGQL: AllItemsByOrganisationGQL,
    private route: ActivatedRoute,
    public location: Location
    ) { }

  async ngOnInit() {
    this.allStages$ = this.getAllStages();
    this.allCategories$ = this.getAllCategories();
    this.allOrganisations$ = this.getAllOrganisations();
    this.allPages$ = this.getAllPages();
    this.route.snapshot.queryParamMap.get('researchCategories') != null ? this.categoryFilter = [...this.route.snapshot.queryParamMap.get('researchCategories').split(",")] : ''; 
    this.route.snapshot.queryParamMap.get('researchActivities') != null ? this.stageFilter = [...this.route.snapshot.queryParamMap.get('researchActivities').split(",")] : '';
    this.updateSearchFilters();
  }

  // Create the initial page lsit
  public initialPages() {
    this.getAllPages().subscribe(data => {
      this.allPagesBaseArray = 
        [...data.articleCollection.items,
          ...data.equipmentCollection.items,
          ...data.subHubCollection.items,
          ...data.softwareCollection.items,
          ...data.serviceCollection.items,
          ...data.eventCollection.items,
          ...data.caseStudyCollection.items
        ];

        // Deep copy the base array and create clone
        // this.allCurrentPages = this.allPagesBaseArray.map((x) => {return { ...x };});
        // console.log(this.createPagination(this.allCurrentPages, 10));
    });
  }

  // Create pagination
  // public createPagination(array, page_size) {
  //   return array.reduce((acc, val, i) => {
  //     let idx = Math.floor(i / page_size)
  //     let page = acc[idx] || (acc[idx] = [])
  //     page.push(val)
  
  //     return acc
  //   }, [])
  // }

  // Get all research stages
  public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }

  // Get all research categories
  public getAllCategories(): Observable<CategoryCollection> {
    try {
      return this.allCategoriesGQL.fetch()
        .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
    } catch (e) { console.error('Error loading all Categories:', e) };
  }

  // Get all organisations
  public getAllOrganisations(): Observable<OrgUnitCollection> {
    try {
      return this.allOrganisationsGQL.fetch()
        .pipe(pluck('data', 'orgUnitCollection')) as Observable<OrgUnitCollection>
    } catch (e) { console.error('Error loading all organisations:', e) };
  }

  // Get All Pages
  public getAllPages() {
    try {
      return this.allPagesGQL.fetch()
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Category
  public getAllItemsByCategory(filter) {
    try {
      return this.allItemsByCategoryGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Stage
  public getAllItemsByStage(filter) {
    try {
      return this.allItemsByStageGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Get All Pages by Organisation
  public getAllItemsByOrganisation(filter) {
    try {
      return this.allItemsByOrganisationGQL.fetch({ displayOrder: filter })
        .pipe(pluck('data'));
    } catch (e) { console.error('Error loading all pages:', e) };
  }

  // Update search filters
  public updateSearchFilters() {
    let url = 'search';
    this.initialPages();

    if (this.categoryFilter.length > 0) {
      if (url == 'search') { url += '?' } else { url += '&' }
      url += 'researchCategories=' + this.categoryFilter;
      this.categoryFilter.forEach (x => {
        this.getAllItemsByCategory(parseInt(x)).subscribe(data => {
          let categories = [
            ...data.categoryCollection["items"][0]["linkedFrom"].articleCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].equipmentCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].subHubCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].serviceCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].softwareCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].eventCollection.items,
            ...data.categoryCollection["items"][0]["linkedFrom"].caseStudyCollection.items
          ];
          this.allCurrentPages = this.allCurrentPages.filter(x => categories.some(y => y.slug == x.slug));
        })
      });
    }
    if (this.stageFilter.length > 0) {
      if (url == 'search') { url += '?' } else { url += '&' }
      url += 'researchActivities=' + this.stageFilter;
      this.stageFilter.forEach (x => {
        this.getAllItemsByStage(parseInt(x)).subscribe(data => {
          let stages = [
            ...data.stageCollection["items"][0]["linkedFrom"].articleCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].equipmentCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].subHubCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].serviceCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].softwareCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].eventCollection.items,
            ...data.stageCollection["items"][0]["linkedFrom"].caseStudyCollection.items
          ];
          this.allCurrentPages = this.allCurrentPages.filter(x => stages.some(y => y.slug == x.slug));
        })
      });
    }
    if (this.organisationFilter.length > 0) {
      if (url == 'search') { url += '?' } else { url += '&' }
      url += 'organisations=' + this.organisationFilter;
      this.organisationFilter.forEach (x => {
        this.getAllItemsByOrganisation(parseInt(x)).subscribe(data => {
          let orgs = [
            ...data.orgUnitCollection["items"][0]["linkedFrom"].articleCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].equipmentCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].subHubCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].serviceCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].softwareCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].eventCollection.items,
            ...data.orgUnitCollection["items"][0]["linkedFrom"].caseStudyCollection.items
          ];
          this.allCurrentPages = this.allCurrentPages.filter(x => orgs.some(y => y.slug == x.slug));
        })
      });
    }
    this.location.replaceState(url);
  }

  // Update ordering method when user changes filter
  updateOrder() {
    switch(this.sortType) {
      case 'Alphabetical':
        this.sortAlphabetical();
        break;
      case 'Default':
        this.sortDefault();
        break;
    }
  }

  // Alphabetical sort
  sortAlphabetical() {
    this.allCurrentPagesUnsorted = this.allCurrentPages.map((x) => {return { ...x };});
    this.allCurrentPages= this.allCurrentPages.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })
  }

  // Content sort
  sortDefault() {
    this.allCurrentPages = this.allCurrentPagesUnsorted.map((x) => {return { ...x };});
  }
}
