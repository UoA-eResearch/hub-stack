import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentGraph, ContentLink, ContentNode } from '@resolvers/content-graph.resolver';
import ForceGraph, { ForceGraphInstance } from 'force-graph';

@Component({
  selector: 'app-graph-container',
  template: `
    <div id="graph"></div>
  `,
  styles: [
    `#graph {width: auto}`,
  ]
})
export class GraphContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() colorMap: Map<string, string>;
  @Input() public set selectedNode(value: ContentNode | null) {
    this.changeSelectedNode(value);
  }

  @Output() selectedNodeChange = new EventEmitter<ContentNode | null>();

  public get selectedNode(): ContentNode | null {
    return this._selectedNode;
  }
  public nodes: ContentNode[];

  private graph: ForceGraphInstance;

  private highlightNodes = new Set<ContentNode>();
  private highlightLinks = new Set<ContentLink>();
  private hoverNode: ContentNode | null = null;

  private selectedNeighbourNodes = new Set<ContentNode>();
  private selectedNeighbourLinks = new Set<ContentLink>();
  private _selectedNode: ContentNode | null = null;

  private readonly NODE_R = 8;

  constructor(
    private route: ActivatedRoute
  ) {
    this.graph = ForceGraph();
  }

  ngOnInit(): void {
    const graph = this.route.snapshot.data.graph as ContentGraph;
    console.log(graph)

    this.findNeighbours(graph);

    this.nodes = graph.nodes;

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
      //.nodeAutoColorBy('type')
      .nodeColor((node: ContentNode) => node.color = this.colorMap.get(node.type) ?? 'black')
      .onNodeClick((node: ContentNode) => {
        this.changeSelectedNode(node);
      })
      .onBackgroundClick(() => this.selectedNode = null)
      .onNodeHover((node: ContentNode) => {
        this.highlightLinks.clear();
        this.highlightNodes.clear();

        if (node) {
          this.highlightNodes.add(node);
          [
            ...(node.linkedFrom ? node.linkedFrom : []),
            ...(node.linksTo ? node.linksTo : [])
          ].forEach(neighbour => this.highlightNodes.add(neighbour));
          node.links?.forEach(link => this.highlightLinks.add(link));
        }

        this.hoverNode = node || null;
      })
      .autoPauseRedraw(false)
      .linkWidth((link: ContentLink) => this.highlightLinks.has(link) ? 5 : 1)
      .linkDirectionalParticles(4)
      .linkDirectionalParticleWidth((link: ContentLink) => this.highlightLinks.has(link) || this.selectedNeighbourLinks.has(link) ? 4 : 0)
      .nodeCanvasObjectMode((node: ContentNode) => this.highlightNodes.has(node) || this.selectedNeighbourNodes.has(node) ? 'before' : undefined)
      .nodeCanvasObject((node: ContentNode, ctx) => {
        // add ring just for highlighted nodes
        if (!node.x || !node.y) return;
        ctx.beginPath();
        ctx.arc(node.x, node.y, this.NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === this.hoverNode
          ? 'red'
          : node === this.selectedNode
            ? 'blue'
            : 'orange';
        ctx.fill();
      })
      .d3AlphaDecay(0.04)
      .d3VelocityDecay(0.2)
      .maxZoom(3);
  }

  ngOnDestroy(): void {
    this.graph?._destructor();
  }

  private changeSelectedNode(node: ContentNode | null) {
    this.selectedNeighbourNodes.clear();
    this.selectedNeighbourLinks.clear();

    if (node) {
      this.selectedNeighbourNodes.add(node);
      [
        ...(node.linkedFrom ? node.linkedFrom : []),
        ...(node.linksTo ? node.linksTo : [])
      ].forEach(neighbour => this.selectedNeighbourNodes.add(neighbour));
      node.links?.forEach(link => this.selectedNeighbourLinks.add(link));
    }

    this._selectedNode = node || null

    this.centerAtNode(node);

    this.selectedNodeChange.emit(node);
  }

  private centerAtNode(node: ContentNode | null) {
    if (node) {
      if (!node.x || !node.y) return;
      this.graph.centerAt(node.x, node.y, 1000);
      this.graph.zoomToFit(2000, 75, (currentNode: ContentNode) => node.neighbours ? node.neighbours.includes(currentNode) : false);
    } else {
      this.graph.zoomToFit(2000);
    }
  }

  /**
 * Adds neighbour information to node objects in graph
 * @param graph graph object
 */
  private findNeighbours(graph: ContentGraph): void {
    graph.links.forEach(link => {
      const sourceNode = graph.nodes.find(node => node.id === link.source);
      const targetNode = graph.nodes.find(node => node.id === link.target);
      if (!sourceNode || !targetNode) return;
      !sourceNode.neighbours && (sourceNode.neighbours = []);
      !targetNode.neighbours && (targetNode.neighbours = []);
      !sourceNode.linksTo && (sourceNode.linksTo = []);
      !targetNode.linkedFrom && (targetNode.linkedFrom = []);
      sourceNode.linksTo.push(targetNode);
      sourceNode.neighbours.push(targetNode)
      targetNode.linkedFrom.push(sourceNode);
      targetNode.neighbours.push(sourceNode)

      !sourceNode.links && (sourceNode.links = []);
      !targetNode.links && (targetNode.links = []);
      sourceNode.links.push(link);
      targetNode.links.push(link);
    })
  }

}
