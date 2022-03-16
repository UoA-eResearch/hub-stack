import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { SharedModule } from '../shared/app.shared.module';

const routes: Routes = [
  { path: '', component: GraphContainerComponent }
]

@NgModule({
  declarations: [
    GraphContainerComponent,
    NodeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ContentGraphModule { }
