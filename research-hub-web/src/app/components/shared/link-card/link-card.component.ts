import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit {

  @Input() contentItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
