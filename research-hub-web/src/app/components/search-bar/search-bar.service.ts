import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { 
  AllCategoriesGQL,
  AllStagesGQL,
  AllOrganisationsGQL,
  AllPagesGQL,
  AllItemsByCategoryGQL,
  AllItemsByStageGQL,
  AllItemsByOrganisationGQL,
  CategoryCollection,
  OrgUnitCollection,
  StageCollection
} from '@app/graphql/schema';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export class SearchBarParams {
  public category: string;
  public searchText: string;
}


@Injectable()
export class SearchBarService {

  public filterButtonClickChange: Subject<any> = new Subject<any>();
  public searchBarVisibilityChange: Subject<any> = new Subject<any>();
  public searchChange: Subject<any> = new Subject<any>();
  public searchCategoryChange: Subject<any> = new Subject<any>();
  public resultsChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchTextChange: Subject<any> = new Subject<any>();
  public isVisible: boolean;
  public searchText: string;
  public category: string;
  public allPagesBaseArray;
  public resultArray;

  constructor(
    public allCategoriesGQL: AllCategoriesGQL,
    public allStagesGQL: AllStagesGQL,
    public allOrganisationsGQL: AllOrganisationsGQL,
    public allPagesGQL: AllPagesGQL,
    public allItemsByCategoryGQL: AllItemsByCategoryGQL,
    public allItemsByStageGQL: AllItemsByStageGQL,
    public allItemsByOrganisationGQL: AllItemsByOrganisationGQL,
    private http: HttpClient
  ) { }

  setFilterButtonClicked() {
    this.filterButtonClickChange.next('filter');
  }

  setVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
    this.searchBarVisibilityChange.next(isVisible);
  }

  setCategory(category) {
    if (category !== undefined) {
      this.category = category;
      this.searchCategoryChange.next(category);
    }
  }

  setSearchText(searchText) {
    if (searchText !== undefined) {
      this.searchText = searchText;
      this.searchTextChange.next(searchText);
    }
  }

  getCategory() {
    return this.category;
  }

  getSearchText() {
    return this.searchText;
  }

  getResults() {
    return this.resultArray;
  }

  setResults(results) {
      this.resultArray = results;
      this.resultsChange.next(results);
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

  // Create list result
  public createResultsList() {
      if (this.searchText != undefined) {

        this.http.post(environment.searchUrl, { query: this.searchText }).subscribe(data => {
          let array = [];
          data["result"]["hits"]["hits"].forEach(element => {
            let result = {
              "title": element._source.fields.title["en-US"],
              "summary" : element._source.fields.summary["en-US"],
              "slug" : element._source.fields.slug["en-US"],
              "ssoProtected" : element._source.fields.ssoProtected["en-US"],
              "__typename" : element._source.sys.contentType.sys.id
            }
            array.push(result);
          });
          this.setResults(array)
        })
      }
      else {
        this.getAllPages().subscribe(data => {
          let array = [
              ...data.articleCollection.items,
              ...data.equipmentCollection.items,
              ...data.subHubCollection.items,
              ...data.softwareCollection.items,
              ...data.serviceCollection.items,
              ...data.eventCollection.items,
              ...data.caseStudyCollection.items
            ];
          this.setResults(array);
        });
      }
  }
}
