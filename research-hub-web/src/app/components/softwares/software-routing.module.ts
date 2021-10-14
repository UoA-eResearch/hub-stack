import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareListComponent } from './software-list/software-list.component';
import { SoftwareComponent } from './software/software.component';


const routes: Routes = [
  { path: '', component: SoftwareListComponent },
  { path: ':slug', component: SoftwareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
