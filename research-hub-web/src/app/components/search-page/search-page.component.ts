import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  AllCategoriesGQL,
  AllStagesGQL,
  AllOrganisationsGQL,
  CategoryCollection,
  OrgUnitCollection,
  StageCollection
} from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public allCategories$: Observable<CategoryCollection>;
  public allStages$: Observable<StageCollection>;
  public allOrganisations$: Observable<OrgUnitCollection>;
  public categoryFilter;
  public stageFilter;
  public organisationFilter;
  public params;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public allStagesGQL: AllStagesGQL,
    public allOrganisationsGQL: AllOrganisationsGQL,
    private route: ActivatedRoute
    ) {}

  async ngOnInit() {
    this.allCategories$ = this.getAllCategories();
    this.allStages$ = this.getAllStages();
    this.allOrganisations$ = this.getAllOrganisations();
    this.route.queryParams.subscribe(data => {
      this.params = data;
    });
    console.log([this.route.snapshot.queryParamMap.get('researchCategories')]);
    console.log([this.route.snapshot.queryParamMap.get('researchActivities')]);
    this.categoryFilter = [this.route.snapshot.queryParamMap.get('researchCategories')];
    this.stageFilter = [this.route.snapshot.queryParamMap.get('researchActivities')];
  }

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
}
