import { Component, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-blocks-embedded-entry',
  templateUrl: './blocks-embedded-entry.component.html',
  styleUrls: ['./blocks-embedded-entry.component.scss']
})
export class BlocksEmbeddedEntryComponent extends NodeRenderer implements OnInit {
  public contentItem;

  constructor() { super(); }

  ngOnInit(): void {
    this.contentItem = this.node.data.target.contentItem;
  }
}
