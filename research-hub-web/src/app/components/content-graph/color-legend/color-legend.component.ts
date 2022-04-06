import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-legend',
  template: `
    <h2>Legend</h2>
    <section>
      <ul>
        <li *ngFor="let mapping of colorMap | keyvalue">
          <span [ngStyle]="{ 'background-color': mapping.value }"></span>
          {{ mapping.key | contentTypeDisplayName }}
        </li>
      </ul>
    </section>
  `,
  styles: [
    `ul {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
    }`,
    `ul li span {
      float: left;
      border-radius: 2px;
      width: 16px;
      height: 16px;
      margin: 2px;
    }`
  ]
})
export class ColorLegendComponent {
  @Input() colorMap: Map<string, string>;

  constructor() { }
}
