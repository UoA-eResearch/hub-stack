import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: GraphContainerComponent }
]

@NgModule({
  declarations: [
    GraphContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentGraphModule { }
