import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphLayoutComponent } from './graph-layout/graph-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { SharedModule } from '../shared/app.shared.module';
import { GraphFilterComponent } from './graph-filter/graph-filter.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorLegendComponent } from './color-legend/color-legend.component';
import { GraphContainerComponent } from './graph-container/graph-container.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
  { path: '', component: GraphLayoutComponent }
]

@NgModule({
  declarations: [
    GraphLayoutComponent,
    NodeDetailsComponent,
    GraphFilterComponent,
    ColorLegendComponent,
    GraphContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSidenavModule,
    MatProgressBarModule
  ]
})
export class ContentGraphModule { }
