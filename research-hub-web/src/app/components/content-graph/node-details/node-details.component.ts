import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environments/environment';
import { ContentNode } from '@services/content-graph.service';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss']
})
export class NodeDetailsComponent {
  @Input() node: ContentNode;
  @Input() colorMap: Map<string, string>;
  @Output() nodeChange = new EventEmitter<ContentNode | null>();

  public environment = environment;

  constructor() { }

  changeSelection(node: ContentNode | null) {
    if (node) this.node = node;
    this.nodeChange.emit(node);
  }

}
