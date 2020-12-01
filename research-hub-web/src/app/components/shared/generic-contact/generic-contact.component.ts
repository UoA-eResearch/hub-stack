import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-contact',
  templateUrl: './generic-contact.component.html',
  styleUrls: ['./generic-contact.component.scss']
})
export class GenericContactComponent implements OnInit {

  @Input() contentItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
