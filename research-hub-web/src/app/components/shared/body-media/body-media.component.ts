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
  public assets;
  public entries;
  public mediaSub: Subscription;

  constructor(private bodyMediaService: BodyMediaService) { 
    super(); 
  }

  async ngOnInit() {
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
    this.mediaSub = this.bodyMediaService.bodyMedia.subscribe(x => {
      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = 'embedded-asset-block';
          break;
        case 'embedded-entry-block':
          this.contentItem = 'embedded-entry-block'
          break;
        case 'embedded-entry-inline':
          this.contentItem = 'embedded-entry-inline';
          break;
        case 'hyperlink':
          this.contentItem = 'hyperlink';
          break;
      }
      /**
       * Switch case this.data.nodeType
       * filter response data by deconstruction e.g. x.assets.(nodeType).filter((id) => id == this.data.data.target.sys.id)
       */
      this.assets = x.assets;
      this.entries = x.entries;
    });
  }

  async ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
