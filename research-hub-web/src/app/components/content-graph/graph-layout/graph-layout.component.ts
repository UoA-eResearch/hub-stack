import { Component } from '@angular/core';
import { ContentNode } from '@services/content-graph.service';

@Component({
  selector: 'app-graph-layout',
  template: `
    <mat-drawer-container>
      <mat-drawer mode="side" opened>
        <div class="graph-drawer-container">
          <h1>HubGraph</h1>
          <app-color-legend [colorMap]="colorMap"></app-color-legend>
          <app-graph-filter [nodes]="nodes" [(selectedNode)]="selectedNode"></app-graph-filter>
          <app-node-details *ngIf="selectedNode" [(node)]="selectedNode"></app-node-details>
        </div>
      </mat-drawer>
      <mat-drawer-content>
        <app-graph-container [(nodes)]="nodes" [(selectedNode)]="selectedNode" [colorMap]="colorMap"></app-graph-container>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `h1 {font-size: 52px;}`,
    `mat-drawer-container {height: calc(100vh - 64px); width: 100vw}`,
    `mat-drawer {width: 30vw; max-width: 500px;}`,
    `.graph-drawer-container {
      margin-bottom: 25px;
      padding: 0 20px;
      width: 100%;
    }`
  ]
})
export class GraphLayoutComponent {
  public nodes: ContentNode[] = [];
  public selectedNode: ContentNode | null;

  // colorbrewer qualitative Set1
  private colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'];

  public colorMap = new Map([
    ['subHub', this.colors[0]],
    ['article', this.colors[1]],
    ['event', this.colors[2]],
    ['equipment', this.colors[3]],
    ['funding', this.colors[4]],
    ['service', this.colors[5]],
    ['software', this.colors[6]],
    ['caseStudy', this.colors[7]],
  ]);
}
