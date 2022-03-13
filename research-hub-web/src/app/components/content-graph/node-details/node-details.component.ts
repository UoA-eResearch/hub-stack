import { Component, Input, OnInit } from '@angular/core';
import { ContentNode } from '@resolvers/content-graph.resolver';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent {
  @Input() node: ContentNode;

  constructor() { }

  // ngOnInit(): void {
  // }

}
