import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-block',
  templateUrl: './entry-block.component.html',
  styleUrls: ['./entry-block.component.scss']
})
export class EntryBlockComponent implements OnInit {
  @Input() contentItem;

  constructor() { }

  ngOnInit() {}
}
