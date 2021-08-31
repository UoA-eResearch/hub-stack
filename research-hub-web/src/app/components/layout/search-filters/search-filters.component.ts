import { state, style } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { FilterType } from '@app/global/global-variables';
import { SearchFilters } from '@app/global/searchTypes';
import { AllCategoriesGQL, AllOrganisationsGQL, AllStagesGQL, Category, OrgUnit, Stage } from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input() activeFilters: SearchFilters = { category: [], stage: [], relatedOrgs: [] };
  @Output() activeFiltersChange: EventEmitter<SearchFilters> = new EventEmitter<SearchFilters>();
  @Output() search: EventEmitter<SearchFilters> = new EventEmitter<SearchFilters>();

  public allCategories$: Observable<Category[]>;
  public allStages$: Observable<Stage[]>;
  public allOrgUnits$: Observable<OrgUnit[]>;

  constructor(
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL,
    private allOrgUnitsGQL: AllOrganisationsGQL
  ) { }

  ngOnInit(): void {
    this.allCategories$ = this.getAllCategories();
    this.allStages$ = this.getAllStages();
    this.allOrgUnits$ = this.getAllOrgUnits();
  }

  private getAllCategories(): Observable<Category[]> {
    return this.allCategoriesGQL.fetch().pipe(
      map((result) => result.data.categoryCollection.items)
    ) as Observable<Category[]>;
  }

  private getAllStages(): Observable<Stage[]> {
    return this.allStagesGQL.fetch().pipe(
      map((result) => result.data.stageCollection.items)
    ) as Observable<Stage[]>;
  }

  private getAllOrgUnits(): Observable<OrgUnit[]> {
    return this.allOrgUnitsGQL.fetch().pipe(
      map((result) => result.data.orgUnitCollection.items)
    ) as Observable<OrgUnit[]>;
  }

  public clearFilters(): void {
    this.activeFilters.category = [];
    this.activeFilters.stage = [];
    this.activeFilters.relatedOrgs = [];
  }
}
