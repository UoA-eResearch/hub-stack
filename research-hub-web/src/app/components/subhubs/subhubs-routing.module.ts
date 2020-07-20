import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubhubsComponent } from './subhubs.component';


const routes: Routes = [
  {path: '', component: SubhubsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubhubsRoutingModule { }
