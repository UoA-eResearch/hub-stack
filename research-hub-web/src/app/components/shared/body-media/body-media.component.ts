import { Component, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from './body-media.service';

@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit {
  public data;
  constructor(public bodyMediaService: BodyMediaService) { 
    super(); 
  }

  async ngOnInit() {
    this.data = this.node;
  }
}
