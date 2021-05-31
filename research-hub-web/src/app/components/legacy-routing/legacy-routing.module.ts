import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacyRoutingComponent } from './legacy-routing.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LegacyRoutingComponent }
];

@NgModule({
  declarations: [LegacyRoutingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LegacyRoutingModule { }
