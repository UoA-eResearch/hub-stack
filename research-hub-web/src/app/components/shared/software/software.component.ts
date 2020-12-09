import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {

  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
