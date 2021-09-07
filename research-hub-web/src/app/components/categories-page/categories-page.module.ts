import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/app.shared.module';
import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesPageRoutingModule } from './categories-page-routing.module';



@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesPageRoutingModule
  ]
})
export class CategoriesPageModule { }
