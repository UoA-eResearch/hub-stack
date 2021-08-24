import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { SearchFilters } from '@app/global/searchTypes';
import { AllCategoriesGQL, AllStagesGQL, Category, Stage } from '@app/graphql/schema';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {
  @Input() activeFilters: SearchFilters = {category: [], stage: [], relatedOrgs: []};
  @Output() activeFiltersChange: EventEmitter<SearchFilters> = new EventEmitter<SearchFilters>();

  public allCategories$: Observable<Category[]>;
  public allStages$: Observable<Stage[]>;

  public loading = false;

  constructor(
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.allCategories$ = this.getAllCategories();
    this.allStages$ = this.getAllStages();
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

  public getSelected(list: MatSelectionList) {
    return list.selectedOptions.selected.map(x => x.value).join(',');
  }

}
