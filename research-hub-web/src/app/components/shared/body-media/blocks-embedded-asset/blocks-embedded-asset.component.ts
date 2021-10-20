import { Component, Input, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from '@services/body-media.service';

@Component({
  selector: 'app-blocks-embedded-asset',
  templateUrl: './blocks-embedded-asset.component.html',
  styleUrls: ['./blocks-embedded-asset.component.scss']
})
export class BlocksEmbeddedAssetComponent extends NodeRenderer implements OnInit {
  public contentItem;

  constructor(public bodyMediaService: BodyMediaService) { super(); }

  ngOnInit(): void {
    this.contentItem = this.bodyMediaService.getContentItem(this.node);
  }
}
