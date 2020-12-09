import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-organisational-unit',
  templateUrl: './organisational-unit.component.html',
  styleUrls: ['./organisational-unit.component.scss']
})
export class OrganisationalUnitComponent implements OnInit {

  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
