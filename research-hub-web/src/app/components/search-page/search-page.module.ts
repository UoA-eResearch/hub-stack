import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { SharedModule } from '@components/shared/app.shared.module';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule,
    NgxContentfulRichTextModule
  ]
})
export class SearchPageModule { }
