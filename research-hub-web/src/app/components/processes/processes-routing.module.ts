import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessComponent } from './process/process.component';

const routes: Routes = [
  { path: '', component: ProcessComponent },
  { path: 'list', component: ProcessListComponent },
  { path: ':slug', component: ProcessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
