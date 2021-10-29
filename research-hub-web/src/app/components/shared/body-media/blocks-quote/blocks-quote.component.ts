import { Component, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-blocks-quote',
  templateUrl: './blocks-quote.component.html',
  styleUrls: ['./blocks-quote.component.scss']
})
export class BlocksQuoteComponent extends NodeRenderer implements OnInit {
  public contentItem;

  constructor() { super(); }

  ngOnInit(): void {
    this.contentItem = this.node.content[0];
    if (!this.contentItem) {
      console.error(`Error retrieving contentItem for node: ${this.node}`)
    }
  }
}
