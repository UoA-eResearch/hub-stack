import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesPageRoutingModule } from './categories-page-routing.module';



@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    CategoriesPageRoutingModule
  ]
})
export class CategoriesPageModule { }
