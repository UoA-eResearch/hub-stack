import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ContentGraphModule { }
