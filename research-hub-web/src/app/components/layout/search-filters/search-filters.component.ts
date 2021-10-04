import { state, style } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FilterType } from '@app/global/global-variables';
import { SearchFilters } from '@app/global/searchTypes';
import { AllCategoriesGQL, AllOrganisationsGQL, AllStagesGQL, Category, OrgUnit, Stage } from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit, OnDestroy {
  @Input() activeFilters: SearchFilters = { category: [], stage: [], relatedOrgs: [] };
  @Input() activeFiltersCount: number = 0;
  @Output() activeFiltersChange: EventEmitter<SearchFilters> = new EventEmitter<SearchFilters>();
  @Output() search: EventEmitter<SearchFilters> = new EventEmitter<SearchFilters>();

  public allCategories: Category[];
  public allStages: Stage[];
  public allOrgUnits: OrgUnit[];

  public isMobile = false;

  private subscriptions = new Subscription();

  constructor(
    private allCategoriesGQL: AllCategoriesGQL,
    private allStagesGQL: AllStagesGQL,
    private allOrgUnitsGQL: AllOrganisationsGQL,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      // Wait until the first navigation has occurred before sending requests.
      // This is because on the preview environment all requests require authentication.
      // We need to let the LoginSuccessGuard to perform code exchange first before
      // being able to send authenticated requests. 
      // See routing.ts. 
      first(event => event instanceof NavigationEnd)
    ).subscribe(_ => {
      this.subscriptions.add(this.getAllCategories().subscribe(categories => this.allCategories = categories));
      this.subscriptions.add(this.getAllStages().subscribe(stages => this.allStages = stages));
      this.subscriptions.add(this.getAllOrgUnits().subscribe(orgUnits => this.allOrgUnits = orgUnits));
    });
    this.subscriptions.add(this.breakpointObserver.observe('(max-width: 1100px)').subscribe(isSmallScreen => this.isMobile = isSmallScreen.matches))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  public onSearch(event: Event) {
    this.search.emit(this.activeFilters)
  }

  public clearFilters(): void {
    this.activeFilters.category = [];
    this.activeFilters.stage = [];
    this.activeFilters.relatedOrgs = [];
  }
}
