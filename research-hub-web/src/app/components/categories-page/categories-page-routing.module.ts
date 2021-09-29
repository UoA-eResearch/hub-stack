import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPageComponent } from './categories-page.component';

const routes: Routes = [
  { path: '', component: CategoriesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesPageRoutingModule { }