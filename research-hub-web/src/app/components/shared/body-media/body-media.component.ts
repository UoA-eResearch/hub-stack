import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from '@services/body-media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit, OnDestroy {
  public data;
  public contentItem;
  public mediaSub: Subscription;

  constructor(
    private bodyMediaService: BodyMediaService)
  { super(); }

  async ngOnInit() {
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
    this.mediaSub = this.bodyMediaService.bodyMedia.subscribe(x => {
      /**
       * Switch case based on response nodeType
       * filter response data by piping e.g. x.assets.(nodeType).filter((id) => id == this.data.data.target.sys.id)
       */
      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = x.assets['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-block':
          this.contentItem = x.entries['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          this.contentItem = x.entries['inline'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          this.contentItem = x.entries['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          this.contentItem = x.assets['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'blockquote':
          this.contentItem = this.data.content[0];
      }
    });
  }

  async ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
