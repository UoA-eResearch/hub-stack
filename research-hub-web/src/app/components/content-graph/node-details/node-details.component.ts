import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentNode } from '@resolvers/content-graph.resolver';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent {
  @Input() node: ContentNode;
  @Output() nodeChange = new EventEmitter<ContentNode | null>();

  constructor() { }

  changeSelection(node: ContentNode | null) {
    if (node) this.node = node;
    this.nodeChange.emit(node);
  }

}
