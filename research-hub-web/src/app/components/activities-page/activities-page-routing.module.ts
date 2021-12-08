import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesPageComponent } from './activities-page.component';

const routes: Routes = [
  { path: '', component: ActivitiesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesPageRoutingModule { }