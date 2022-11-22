import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ // TODO add components
  { path: '' },
  { path: 'list' },
  { path: ':slug' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapabilityRoutingModule { }
