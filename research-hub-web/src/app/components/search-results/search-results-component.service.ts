import { Injectable } from '@angular/core';
import { Page } from 'app/model/Page';
import { ListItem } from 'app/model/ListItem';
import { ResearchHubApiService, SearchResultsParams } from 'app/services/research-hub-api.service';
import { map ,  delay } from 'rxjs/operators';
import { forkJoin ,  BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchResultsComponentService {

  private resultsSubject: BehaviorSubject<Page<ListItem>>;
  public results$ : Observable<Page<ListItem>>;
  private resultsLoadingSubject : BehaviorSubject<boolean>;
  public resultsLoading$ : Observable<boolean>;

  private categorySubject: BehaviorSubject<Array<Object>>;
  public resultsCategories$ : Observable<Array<Object>>;
  private categoriesLoadingSubject : BehaviorSubject<boolean>;
  public categoriesLoading$ : Observable<boolean>;

  constructor(public apiService: ResearchHubApiService) {
    this.initialiseSubjects();
  }

  public searchWithParams(params: SearchResultsParams){
    this.resultsLoadingSubject.next(true);
    const resultsSub = this.updateSearchResults(params)
      .pipe(delay(250)) // Add delay to make result changes obvious.
      .subscribe(page =>
                 {
                   this.resultsSubject.next(page);
                   this.resultsLoadingSubject.next(false);
                   resultsSub.unsubscribe();
                 }
                );

    this.categoriesLoadingSubject.next(true);
    const categorySub = this.updateSearchResultsCategories(params)
      .subscribe(categories => {
        this.categoriesLoadingSubject.next(false);
        this.categorySubject.next(categories);
        categorySub.unsubscribe();
      });
  }

  initialiseSubjects(){
    // We initialise the Subjects with an empty initial value.
    this.resultsSubject = new BehaviorSubject<Page<ListItem>>(<Page<ListItem>>{});
    this.results$ = this.resultsSubject.asObservable();

    this.resultsLoadingSubject = new BehaviorSubject<boolean>(false);
    this.resultsLoading$ = this.resultsLoadingSubject.asObservable();

    this.categorySubject = new BehaviorSubject<Array<Object>>([]);
    this.resultsCategories$ = this.categorySubject.asObservable();

    this.categoriesLoadingSubject = new BehaviorSubject<boolean>(false);
    this.categoriesLoading$ = this.categoriesLoadingSubject.asObservable();
  }

  private updateSearchResults(params: SearchResultsParams){
    return this.apiService.getSearchResults(params);
  }

  private updateSearchResultsCategories(params: SearchResultsParams){
    const categoryList = {};
    const categoryListArray = [];
    return  this.apiService.getSearchResultsCategories(params).pipe(
      map(res => {
        for (let i = 0; i < res['content'].length; i++) {
          for (let j = 0; j < res['content'][i]['categories'].length; j++) {
            categoryList[res['content'][i]['categories'][j]] = categoryList[res['content'][i]['categories'][j]] === undefined ? 1 : categoryList[res['content'][i]['categories'][j]] + 1;
          }
        }
        // Convert JSON to array for Angular *ngFor
        for (const categoryTuple in categoryList) {
          categoryListArray.push([categoryTuple, categoryList[categoryTuple]]);
        }
        return categoryListArray;
      })
    );
  }


}
