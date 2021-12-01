import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFilters, SortOrder, FilterType } from '@app/global/searchTypes';
import { AllCategoriesGQL, AllOrganisationsGQL, AllStagesGQL, CategoryCollection, OrgUnitCollection, StageCollection } from '@app/graphql/schema';
import { SearchService } from '@services/search.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss']
})
export class SearchFilterBarComponent implements OnInit, AfterViewInit {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public filterTypes = FilterType;

  @Input() searchText: string = '';
  @Input() totalResults: number = 0;
  @Input() sortOrder: SortOrder = 'relevance';
  @Input() activeFilters: SearchFilters = {category: [], stage: [], relatedOrgs: []};

  @Output() sortOrderChange = new EventEmitter<SortOrder>();
  @Output() activeFiltersChange = new EventEmitter<SearchFilters>();

  @ViewChild('stickyBar', {read: ElementRef}) stickyBar: ElementRef;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private allStagesGQL: AllStagesGQL,
    private allCategoriesGQL: AllCategoriesGQL,
    private allOrganisationsGQL: AllOrganisationsGQL
  ) { }

  ngOnInit(): void {
    this.allStages$ = this.getAllStages();
    this.allCategories$ = this.getAllCategories();
    this.allOrganisations$ = this.getAllOrganisations();
  }

  ngAfterViewInit(): void {
    // this enables the shadow when the bar becomes sticky
    const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('elevated', e.intersectionRatio < 1), { threshold: [1] });
    observer.observe(this.stickyBar.nativeElement);
  }

  // Get all research stages
  private getAllStages(): Observable<StageCollection> {
    return this.allStagesGQL.fetch()
      .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
  }

  // Get all research categories
  private getAllCategories(): Observable<CategoryCollection> {
    return this.allCategoriesGQL.fetch()
      .pipe(pluck('data', 'categoryCollection')) as Observable<CategoryCollection>
  }

  // Get all organisations
  private getAllOrganisations(): Observable<OrgUnitCollection> {
    return this.allOrganisationsGQL.fetch()
      .pipe(pluck('data', 'orgUnitCollection')) as Observable<OrgUnitCollection>
  }

  public updateSortOrder() {
    this.router.navigate(['search'], { queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder) });
  }

  public clearFilters() {
    this.activeFilters = {
      category: [],
      stage: [],
      relatedOrgs: []
    };
    this.router.navigate(['search'], { queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder) });
  }

  public removeFilterById(filterId: string, filterType: FilterType) {
    if (filterType === FilterType.ResearchCategory) {
      if (this.activeFilters.category.indexOf(filterId) !== -1) {
        this.activeFilters.category = this.activeFilters.category.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.ResearchActivity) {
      if (this.activeFilters.stage.indexOf(filterId) !== -1) {
        this.activeFilters.stage = this.activeFilters.stage.filter(filter => filter !== filterId);
      }
    }
    if (filterType === FilterType.Organisation) {
      if (this.activeFilters.relatedOrgs.indexOf(filterId) !== -1) {
        this.activeFilters.relatedOrgs = this.activeFilters.relatedOrgs.filter(filter => filter !== filterId);
      }
    }
    this.router.navigate(['search'], { queryParams: this.searchService.generateQueryParams(this.searchText, this.activeFilters, this.sortOrder) });
  }

  public getFilterName(allFilters: { allCategories: CategoryCollection, allStages: StageCollection, allOrganisations: OrgUnitCollection }, filterId: string, filterType: FilterType) {
    switch (filterType) {
      case FilterType.ResearchCategory:
        return allFilters.allCategories?.items.find(element => element?.sys.id === filterId)?.name;
      case FilterType.ResearchActivity:
        return allFilters.allStages?.items.find(element => element?.sys.id === filterId)?.name;
      case FilterType.Organisation:
        return allFilters.allOrganisations?.items.find(element => element?.sys.id === filterId)?.name;
    }
  }

}
