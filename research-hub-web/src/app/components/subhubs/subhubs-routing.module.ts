import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubhubListComponent } from './subhub-list/subhub-list.component';
import { SubhubComponent } from './subhub/subhub.component';


const routes: Routes = [
  { path: '', component: SubhubComponent },
  { path: 'list', component: SubhubListComponent },
  { path: ':slug', component: SubhubComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubhubsRoutingModule { }
