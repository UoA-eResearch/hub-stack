import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { SearchBarService } from './search-bar.service';
import { Subscription } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public isVisible: boolean;
  public categoriesValue = [];
  public isFilterBtnVisible = false;
  private searchTextValue = '';
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();
  @Output() categoriesChange = new EventEmitter();
  @Output() focusOnInitChange = new EventEmitter();
  @ViewChild('searchTextInput', { read: MatInput }) searchTextInput: MatInput;

  private searchTextChangeSub: Subscription;
  constructor(public searchBarService: SearchBarService) {
  }

  ngOnInit() {
    this.searchTextValue = this.searchBarService.getSearchText();

    this.searchTextChangeSub = this.searchBarService.searchTextChange.subscribe(searchText => {
      this.searchTextValue = searchText;
    });
  }

  ngOnDestroy() {
    this.searchTextChangeSub.unsubscribe();
  }

  @Input()
  get searchText() {
    return this.searchTextValue;
  }


  set searchText(val) {
    this.searchTextValue = val;
    this.searchTextChange.emit(val);
    this.searchBarService.setSearchText(val);
  }

  clearSearchText() {
    this.searchText = '';
    this.searchBarService.setSearchText('')
  }
}
