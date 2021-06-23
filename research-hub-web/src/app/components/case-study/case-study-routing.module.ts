import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseStudyComponent } from './case-study.component';

const routes: Routes = [
  { path: '', component: CaseStudyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseStudyRoutingModule { }
