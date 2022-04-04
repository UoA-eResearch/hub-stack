import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.scss']
})
export class ColorLegendComponent {
  @Input() colorMap: Map<string, string>;

  constructor() { }

}
