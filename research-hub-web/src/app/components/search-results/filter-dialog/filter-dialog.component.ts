import {Component, Inject, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryId} from 'app/services/options.service';
import { SearchFiltersService, DEFAULT_FILTERS_VALUE } from '../search-filters/search-filters.service';
import { AnalyticsService } from 'app/services/analytics.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

  public filtersForm: FormGroup;

  constructor(public searchFiltersService : SearchFiltersService, public analyticsService: AnalyticsService) {
    this.filtersForm = searchFiltersService.duplicateFilters();
  }

  public clear() {
    this.filtersForm.patchValue(DEFAULT_FILTERS_VALUE);
  }

  public save(){
    this.searchFiltersService.patchFilters(this.filtersForm);
  }

  public close(){
    this.searchFiltersService.closeFilters();
  }
}
