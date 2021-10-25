import { Component, OnInit } from '@angular/core';
import { BodyMediaService } from '@services/body-media.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-blocks-embedded-entry',
  templateUrl: './blocks-embedded-entry.component.html',
  styleUrls: ['./blocks-embedded-entry.component.scss']
})
export class BlocksEmbeddedEntryComponent extends NodeRenderer implements OnInit {
  public contentItem;

  constructor(public bodyMediaService: BodyMediaService) { super(); }

  ngOnInit(): void {
    this.contentItem = this.bodyMediaService.getContentItem(this.node);
    if (!this.contentItem) {
      console.error(`Error retrieving contentItem for node: ${this.node}`)
    }
  }
}