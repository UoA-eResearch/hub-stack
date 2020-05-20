import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';
import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';
import { OrderbySwitcherComponent } from './orderby-switcher/orderby-switcher.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SearchResultsComponentService } from './search-results-component.service';
import {SearchFiltersComponent} from './search-filters/search-filters.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {ResearchActivityInputComponent} from './research-activity-input/research-activity-input.component';
import {FilterSidenavComponent} from './filter-sidenav/filter-sidenav.component';
import {MatTagsComponent} from './mat-tags/mat-tags.component';
import { SearchResultLinkDirective } from 'app/directives/search-result-link.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    SearchResultsComponent,
    ViewSwitcherComponent,
    OrderbySwitcherComponent,
    CategoryListComponent,
    SearchFiltersComponent,
    FilterDialogComponent,
    ResearchActivityInputComponent,
    MatTagsComponent,
    FilterSidenavComponent,
    SearchResultLinkDirective
  ],
  entryComponents: [
    FilterDialogComponent
  ],
  providers: [
    SearchResultsComponentService
  ],
  exports: [
    SearchResultLinkDirective
  ]
})
export class SearchResultsModule {
}
