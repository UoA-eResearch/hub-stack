import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { SharedModule } from '../shared/app.shared.module';
import { GraphLegendComponent } from './graph-legend/graph-legend.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContentGraphResolver } from '@resolvers/content-graph.resolver';

const routes: Routes = [
  { path: '', component: GraphContainerComponent, resolve: { graph: ContentGraphResolver } }
]

@NgModule({
  declarations: [
    GraphContainerComponent,
    NodeDetailsComponent,
    GraphLegendComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSidenavModule,
  ]
})
export class ContentGraphModule { }
