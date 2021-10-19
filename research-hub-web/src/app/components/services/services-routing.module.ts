import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceComponent } from './service/service.component';


const routes: Routes = [
  { path: '', component: ServiceListComponent },
  { path: ':slug', component: ServiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
