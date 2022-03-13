import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import ForceGraph, { ForceGraphInstance, NodeObject } from 'force-graph';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentGraph, ContentLink, ContentNode } from '@resolvers/content-graph.resolver';
import { Source } from 'graphql';

@Component({
  selector: 'app-graph-container',
  template: `
    <div id="graph"></div>
    <app-node-details *ngIf="selectedNode" [node]="selectedNode"></app-node-details>
  `,
  styles: [`#graph {width: auto}`]
})
export class GraphContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private graph: ForceGraphInstance;

  private highlightNodes = new Set<string>();
  private highlightLinks = new Set<ContentLink>();
  private hoverNode: ContentNode | null = null;

  public selectedNode: ContentNode | null = null;

  private readonly NODE_R = 8;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.graph = ForceGraph();
  }

  ngOnInit(): void {
    const graph = this.route.snapshot.data.graph as ContentGraph;
    console.log(graph)

    this.findNeighbours(graph);

    this.graph.graphData({
      nodes: graph.nodes,
      links: graph.links
    })
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('graph');
    if (!element) return;
    this.graph(element)
      .nodeRelSize(this.NODE_R)
      .backgroundColor('#101020')
      .linkColor(() => 'rgba(255,255,255,0.2)')
      //.nodeColor('red')
      .nodeAutoColorBy('type')
      .onNodeClick((node: ContentNode) => this.selectedNode = node)
      .onNodeRightClick((node: ContentNode) => {
        console.log(node.type, node.slug)
        node.slug ? this.router.navigate([node.type, node.slug]) : null
      })
      .onNodeHover((node: ContentNode) => {
        this.highlightLinks.clear();
        this.highlightNodes.clear();

        if (node) {
          this.highlightNodes.add(node.id);
          node.neighbours?.forEach(neighbour => this.highlightNodes.add(neighbour.id));
          node.links?.forEach(link => this.highlightNodes.add(link.target))
        }

        this.hoverNode = node || null;
      })
      .autoPauseRedraw(false)
      .linkWidth((link: ContentLink) => this.highlightLinks.has(link) ? 5 : 1)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth((link: ContentLink) => this.highlightLinks.has(link) ? 4 : 0)
      .nodeCanvasObjectMode('before')
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        if (!node.x || !node.y) return;
        if (node === this.hoverNode) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, this.NODE_R * 1.4, 0, 2 * Math.PI, false);
          ctx.strokeStyle = 'red';
          ctx.stroke();
        }

        // ctx.beginPath();
        // ctx.arc(node.x, node.y, this.NODE_R, 0, 2 * Math.PI, false);
        // ctx.fillStyle = 'blue';
        // ctx.fill();
      });
  }

  ngOnDestroy(): void {
    this.graph?._destructor();
  }

  /**
   * Adds neighbour information to node objects in graph
   * @param graph graph object
   */
  private findNeighbours(graph: ContentGraph): void {
    graph.links.forEach(link => {
      const a = graph.nodes.find(node => node.id === link.source);
      const b = graph.nodes.find(node => node.id === link.target);
      if (!a || !b) return;
      !a.neighbours && (a.neighbours = []);
      !b.neighbours && (b.neighbours = []);
      a.neighbours.push(b);
      b.neighbours.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    })
  }
}
