import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ContentNode } from '@resolvers/content-graph.resolver';
import { filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-graph-legend',
  templateUrl: './graph-legend.component.html',
  styleUrls: ['./graph-legend.component.scss']
})
export class GraphLegendComponent implements OnInit {
  @Input() nodes: ContentNode[];
  @Input() selectedNode: ContentNode | null;
  @Output() selectedNodeChange = new EventEmitter<ContentNode>();

  public node: FormControl;
  public filteredNodes: Observable<ContentNode[]>;

  constructor() { }

  ngOnInit(): void {
    this.node = new FormControl(this.selectedNode);

    this.filteredNodes = this.node.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    )
  }

  displayFn(node: ContentNode): string {
    return node ? node.name : '';
  }

  updateNode() {
    this.selectedNodeChange.emit(this.node.value)
  }

  private filter(input: string | ContentNode): ContentNode[] {
    if (typeof input === 'string') {
      const filterValue = input.toLowerCase();
      return this.nodes.filter(node => node.name.toLowerCase().includes(filterValue));
    } else {
      return this.nodes.filter(node => node === input);
    }

  }

}
