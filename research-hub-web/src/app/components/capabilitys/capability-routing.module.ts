import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapabilityListComponent } from './capability-list/capability-list.component';
import { CapabilityComponent } from './capability/capability.component';

const routes: Routes = [ // TODO add components
  { path: '', component: CapabilityComponent },
  { path: 'list', component: CapabilityListComponent },
  { path: ':slug', component: CapabilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapabilityRoutingModule { }
