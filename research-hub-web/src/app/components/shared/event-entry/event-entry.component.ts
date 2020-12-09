import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-entry',
  templateUrl: './event-entry.component.html',
  styleUrls: ['./event-entry.component.scss']
})
export class EventEntryComponent implements OnInit {

  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
