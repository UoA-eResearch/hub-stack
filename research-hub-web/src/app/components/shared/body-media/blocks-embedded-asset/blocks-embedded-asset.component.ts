import { Component, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';

@Component({
  selector: 'app-blocks-embedded-asset',
  templateUrl: './blocks-embedded-asset.component.html',
  styleUrls: ['./blocks-embedded-asset.component.scss']
})
export class BlocksEmbeddedAssetComponent extends NodeRenderer implements OnInit {
  public data;
  public contentItem;

  constructor() { super(); }

  ngOnInit(): void {
    /**
     * Inherit data passed from the 'super' content page
     */
     this.data = this.node;

     console.log(this.node)
     console.log('************************')
     console.log(this.data)

     this.contentItem = this.data.data;
  }

}
