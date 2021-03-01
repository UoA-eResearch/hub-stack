import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


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
  public searchTextChange: Subject<any> = new Subject<any>();
  public isVisible: boolean;
  public searchText: string;
  public category: string;

  constructor() { }

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
      this.searchChange.next(this.getSearchParams());
    }
  }

  setSearchText(searchText) {
    if (searchText !== undefined) {
      this.searchText = searchText;
      this.searchTextChange.next(searchText);
      this.searchChange.next(this.getSearchParams());
    }
  }

  getCategory() {
    return this.category;
  }

  getSearchText() {
    return this.searchText;
  }

  getSearchParams(): SearchBarParams {
    return {searchText: this.searchText, category: this.category} as SearchBarParams;
  }
}
