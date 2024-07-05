import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedPagesListComponent } from './protected-pages-list/protected-pages-list.component';

const routes: Routes = [
  { path: 'list', component: ProtectedPagesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedPagesRoutingModule { }
