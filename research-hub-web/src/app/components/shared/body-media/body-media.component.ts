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
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
     this.returnVal$ = this.bodyMediaService.getBodyMedia();

      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = this.returnVal$.assets['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          this.contentItem['size'] = Math.round(this.contentItem['size'] / 1000) + (Math.round(this.contentItem['size'] % 1000) / 100);
          break;
        case 'embedded-entry-block':
          this.contentItem = this.returnVal$.entries['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          this.contentItem = this.returnVal$.entries['inline'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          this.contentItem = this.returnVal$.entries['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          this.contentItem = this.returnVal$.assets['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'unordered-list':
          this.contentItem = {__typename: '', items: this.data.content};
          console.log(this.contentItem.items);
          break;
        case 'ordered-list':
          this.contentItem = {__typename: '', items: []};
          this.data.content.forEach(element => {
            this.contentItem['items'].push(element.content[0].content[0].value);
          })
          break;
        case 'blockquote':
          this.contentItem = {__typename: '', items: []};
          this.data.content.forEach(element => {
            this.contentItem['items'].push(element.content[0].content[0].value);
          })
      }
  }
}
