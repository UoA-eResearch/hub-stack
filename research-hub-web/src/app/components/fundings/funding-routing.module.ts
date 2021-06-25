import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundingsComponent } from './fundings.component';


const routes: Routes = [
  { path: '', component: FundingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
