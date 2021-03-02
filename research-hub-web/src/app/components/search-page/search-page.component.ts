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
import { SearchBarService } from '@app/components/search-bar/search-bar.service';

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
    public searchBarService: SearchBarService,
    private route: ActivatedRoute,
    public location: Location
    ) { }

  async ngOnInit() {
    this.allStages$ = this.searchBarService.getAllStages();
    this.allCategories$ = this.searchBarService.getAllCategories();
    this.allOrganisations$ = this.searchBarService.getAllOrganisations();
    this.allPages$ = this.searchBarService.getAllPages();
    this.route.snapshot.queryParamMap.get('researchCategories') != null ? this.categoryFilter = [...this.route.snapshot.queryParamMap.get('researchCategories').split(",")] : ''; 
    this.route.snapshot.queryParamMap.get('researchActivities') != null ? this.stageFilter = [...this.route.snapshot.queryParamMap.get('researchActivities').split(",")] : '';
    this.updateSearchFilters();
  }

  // Create the initial page lsit
  public initialPages() {
    this.searchBarService.getAllPages().subscribe(data => {
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
        this.allCurrentPages = this.allPagesBaseArray.map((x) => {return { ...x };});
    });
  }

  // Update search filters
  public updateSearchFilters() {
    let url = 'search';
    this.initialPages();

    if (this.categoryFilter.length > 0) {
      if (url == 'search') { url += '?' } else { url += '&' }
      url += 'researchCategories=' + this.categoryFilter;
      this.categoryFilter.forEach (x => {
        this.searchBarService.getAllItemsByCategory(parseInt(x)).subscribe(data => {
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
        this.searchBarService.getAllItemsByStage(parseInt(x)).subscribe(data => {
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
        this.searchBarService.getAllItemsByOrganisation(parseInt(x)).subscribe(data => {
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
