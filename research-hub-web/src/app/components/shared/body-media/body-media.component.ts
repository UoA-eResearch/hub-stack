import { Component, Input, OnInit } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';


@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit {

  public data: any;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.data = this.node;
    console.log(this.data);
  }

}
