import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SearchResultsListComponent } from './search-results-list/search-results-list.component';
import { SearchFilterBarComponent } from './search-filter-bar/search-filter-bar.component';
import { IntranetSearchComponent } from './intranet-search/intranet-search.component';
import { IntranetSearchResultsListComponent } from './intranet-search-results-list/intranet-search-results-list.component';
import { SearchComponent } from './search/search.component';
import { NoResultsComponent } from './no-results/no-results.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchResultsListComponent,
    SearchFilterBarComponent,
    IntranetSearchComponent,
    IntranetSearchResultsListComponent,
    SearchComponent,
    NoResultsComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SearchPageModule { }
