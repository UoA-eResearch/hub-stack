import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseStudyListComponent } from './case-study-list/case-study-list.component';
import { CaseStudyComponent } from './case-study/case-study.component';

const routes: Routes = [
  { path: '', component: CaseStudyComponent },
  { path: 'list', component: CaseStudyListComponent },
  { path: ':slug', component: CaseStudyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseStudyRoutingModule { }
