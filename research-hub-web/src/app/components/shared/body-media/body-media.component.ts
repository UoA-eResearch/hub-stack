import { Component, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from '@services/body-media.service';

@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit {
  public data;
  public returnVal$;
  public contentItem;
  public orderedList = [];
  public unorderedList = [];

  constructor(
    public bodyMediaService: BodyMediaService)
  { super(); }

  ngOnInit() {
    /**
     * Inherit data passed from the 'super' content page
     */
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
     this.returnVal$ = this.bodyMediaService.getBodyMedia();

      switch(this.data.nodeType) {
        // For each type of node, first filter out null values, then find matching node.
        case 'embedded-asset-block':
          this.contentItem = this.returnVal$.assets['block'].filter(x => x).find(x => x.sys.id == this.data.data.target.sys.id);
          this.contentItem['size'] = Math.round(this.contentItem['size'] / 1000) + (Math.round(this.contentItem['size'] % 1000) / 100);
          break;
        case 'embedded-entry-block':
          this.contentItem = this.returnVal$.entries['block'].filter(x => x).find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          this.contentItem = this.returnVal$.entries['inline'].filter(x => x).find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          this.contentItem = this.returnVal$.entries['hyperlink'].filter(x => x).find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          this.contentItem = this.returnVal$.assets['hyperlink'].filter(x => x).find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'blockquote':
          this.contentItem = this.data.content[0];
      }
  }
}
