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
  public returnVal;
  public contentItem;
  public mediaSub: Subscription;

  constructor(
    public bodyMediaService: BodyMediaService)
  { super(); }

  async ngOnInit() {
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
     this.bodyMediaService.getBodyMedia().subscribe(res => this.returnVal = res);

      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = this.returnVal.assets['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-block':
          this.contentItem = this.returnVal.entries['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          this.contentItem = this.returnVal.entries['inline'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          this.contentItem = this.returnVal.entries['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          this.contentItem = this.returnVal.assets['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'blockquote':
          this.contentItem = this.data.content[0];
      }
  }

  async ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
