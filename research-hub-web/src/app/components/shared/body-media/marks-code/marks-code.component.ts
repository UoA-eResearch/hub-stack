import { Component, OnInit } from '@angular/core';
import { MarkRenderer } from 'ngx-contentful-rich-text';


@Component({
  selector: 'app-marks-code',
  templateUrl: './marks-code.component.html'
})
export class MarksCodeComponent extends MarkRenderer implements OnInit {
  public contentItem;
  
  ngOnInit(): void {
    this.contentItem = this.node.value;
  }
}