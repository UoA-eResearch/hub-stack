import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundingListComponent } from './funding-list/funding-list.component';
import { FundingComponent } from './funding/funding.component';


const routes: Routes = [
  { path: '', component: FundingComponent },
  { path: 'list', component: FundingListComponent },
  { path: ':slug', component: FundingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
