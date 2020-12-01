import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-official-document',
  templateUrl: './official-document.component.html',
  styleUrls: ['./official-document.component.scss']
})
export class OfficialDocumentComponent implements OnInit {

  @Input() contentItem

  constructor() { }

  ngOnInit(): void {
  }

}
