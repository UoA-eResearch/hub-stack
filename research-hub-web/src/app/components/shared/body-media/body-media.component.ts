import { Component, OnInit } from '@angular/core';
import { BodyMediaService } from '@services/body-media.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit {
  public contentItem;
  public data;

  constructor(public bodyMediaService: BodyMediaService) { super(); }

  ngOnInit() {
    /**
     * Inherit data passed from the 'super' content page
     */
    try {
      this.data = this.node;
      if(this.node.nodeType === "blockquote") {
        this.contentItem = this.node.content[0];
      } else {
        this.contentItem = this.bodyMediaService.getContentItem(this.node);
      }
    } catch(err) {
      console.error(err);
    }
  }
}
