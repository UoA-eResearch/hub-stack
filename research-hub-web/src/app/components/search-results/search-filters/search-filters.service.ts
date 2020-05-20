import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { CategoryId } from 'app/services/options.service';
import { Subject, Observable } from 'rxjs';

export const DEFAULT_FILTERS_VALUE = {
  categoryId: CategoryId.All,
  personTags: [],
  orgUnitTags: [],
  researchActivityIds: [],
  categories: []
}

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;

  private filtersOpenSubject: Subject<boolean>;
  public filtersOpen$ : Observable<boolean>;
  // The current value of whether the filters are in open state.
  public areFiltersOpen : boolean;


  constructor() {
    this.filtersForm = this.createFilters();
    this.filtersOpenSubject = new Subject<boolean>();
    this.filtersOpen$ = this.filtersOpenSubject.asObservable();
  }

  public closeFilters(){
    this.filtersOpenSubject.next(false);
    this.areFiltersOpen = false;
  }

  public openFilters(){
    this.filtersOpenSubject.next(true);
    this.areFiltersOpen = true;
  }

  /**
   * Create and return a new filters FormGroup that has the same
   * values as the current filters.
   * Used for filter dialog which does not change values instantly.
   */
  public duplicateFilters() : FormGroup {
    const duplicate = this.createFilters();
    duplicate.patchValue(this.filtersForm.getRawValue());
    return duplicate;
  }

  public patchFilters(newFilters : FormGroup) : FormGroup {
    if (!newFilters) {
      return this.filtersForm;
    }
    this.filtersForm.patchValue(newFilters.getRawValue());
    return this.filtersForm;
  }

  private createFilters() : FormGroup {
    const newFilters = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl(),
      categories: new FormControl([])
    });
    newFilters.patchValue(DEFAULT_FILTERS_VALUE);
    return newFilters;
  }
}
