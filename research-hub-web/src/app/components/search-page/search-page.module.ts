import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultsListComponent } from './search-results-list/search-results-list.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchBarComponent,
    SearchResultsListComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SearchPageModule { }
