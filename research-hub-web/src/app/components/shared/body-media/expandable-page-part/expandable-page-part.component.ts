import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expandable-page-part',
  templateUrl: './expandable-page-part.component.html',
  styleUrls: ['./expandable-page-part.component.scss']
})
export class ExpandablePagePartComponent implements OnInit {
  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
    console.log("WOW MUCH EXPAND")
  }

}
