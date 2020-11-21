import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from '@services/body-media.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


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
      console.log(this.data.nodeType);
      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = JSON.stringify(x.assets['block'].find(x => x.sys.id == this.data.data.target.sys.id));
          break;
        case 'embedded-entry-block':
          this.contentItem = JSON.stringify(x.entries['block'].find(x => x.sys.id == this.data.data.target.sys.id));
          break;
        case 'embedded-entry-inline':
          this.contentItem = JSON.stringify(x.entries['inline'].find(x => x.sys.id == this.data.data.target.sys.id));
          break;
        case 'entry-hyperlink':
          this.contentItem = x.entries['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id).title;
          break;
        case 'asset-hyperlink':
          this.contentItem = x.assets['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id).title;
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
