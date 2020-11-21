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
      this.assets = x.assets;
      this.entries = x.entries;
    });
  }

  async ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
