import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import ForceGraph, { ForceGraphInstance, NodeObject } from 'force-graph';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentGraph, ContentLink, ContentNode } from '@resolvers/content-graph.resolver';
import { Source } from 'graphql';

@Component({
  selector: 'app-graph-container',
  template: `
    <div id="graph"></div>
    <app-node-details *ngIf="selectedNode" [(node)]="selectedNode"></app-node-details>
  `,
  styles: [`#graph {width: auto}`]
})
export class GraphContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  private graph: ForceGraphInstance;

  private highlightNodes = new Set<ContentNode>();
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
      .onNodeClick((node: ContentNode) => {
        this.selectedNode = node || null;
      })
      .onBackgroundClick(() => this.selectedNode = null)
      .onNodeHover((node: ContentNode) => {
        this.highlightLinks.clear();
        this.highlightNodes.clear();

        if (node) {
          this.highlightNodes.add(node);
          node.neighbours?.forEach(neighbour => this.highlightNodes.add(neighbour));
          node.links?.forEach(link => this.highlightLinks.add(link));
        }

        this.hoverNode = node || null;
      })
      .autoPauseRedraw(false)
      .linkWidth((link: ContentLink) => this.highlightLinks.has(link) ? 5 : 1)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth((link: ContentLink) => this.highlightLinks.has(link) ? 4 : 0)
      .nodeCanvasObjectMode((node: ContentNode) => this.highlightNodes.has(node) || node === this.selectedNode ? 'before' : undefined)
      .nodeCanvasObject((node, ctx) => {
        // add ring just for highlighted nodes
        if (!node.x || !node.y) return;
        ctx.beginPath();
        ctx.arc(node.x, node.y, this.NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === this.hoverNode
          ? 'red'
          : node === this.selectedNode ? 'blue' : 'orange';
        ctx.fill();
      })
      .d3AlphaDecay(0.04)
      .d3VelocityDecay(0.2);
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
