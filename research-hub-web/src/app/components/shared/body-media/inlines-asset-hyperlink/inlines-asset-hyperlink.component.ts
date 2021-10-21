import { Component, OnInit } from '@angular/core';
import { BodyMediaService } from '@services/body-media.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-inlines-asset-hyperlink',
  templateUrl: './inlines-asset-hyperlink.component.html'
})
export class InlinesAssetHyperlinkComponent extends NodeRenderer implements OnInit {
  public contentItem;
  public data;

  constructor(public bodyMediaService: BodyMediaService) { super(); }

  ngOnInit(): void {
    this.data = this.node;
    this.contentItem = this.bodyMediaService.getContentItem(this.node);
  }
}
