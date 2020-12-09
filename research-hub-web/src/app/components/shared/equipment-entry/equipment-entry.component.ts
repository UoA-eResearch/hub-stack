import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-equipment-entry',
  templateUrl: './equipment-entry.component.html',
  styleUrls: ['./equipment-entry.component.scss']
})
export class EquipmentEntryComponent implements OnInit {

  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
