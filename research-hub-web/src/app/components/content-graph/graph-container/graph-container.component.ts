import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import ForceGraph, { ForceGraphInstance } from 'force-graph';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements AfterViewInit, OnDestroy {
  private graph: ForceGraphInstance;

  constructor(

  ) {
    this.graph = ForceGraph();
  }


  ngAfterViewInit(): void {
    this.graph(document.getElementById('graph'));
  }

  ngOnDestroy(): void {
      this.graph?._destructor();
  }

}
