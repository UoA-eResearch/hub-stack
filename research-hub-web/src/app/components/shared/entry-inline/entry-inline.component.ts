import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-inline',
  templateUrl: './entry-inline.component.html',
  styleUrls: ['./entry-inline.component.scss']
})
export class EntryInlineComponent implements OnInit {
  @Input() contentItem;
  constructor() { }

  ngOnInit(): void {
  }

}
