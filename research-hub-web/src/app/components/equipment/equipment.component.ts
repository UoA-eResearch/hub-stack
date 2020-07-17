import { Component, OnInit } from '@angular/core';
import { AllEquipmentGQL, AllEquipmentQuery } from '../../graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  public allEquipment$: Observable<AllEquipmentQuery['equipmentCollection']>;

  constructor(public allEquipmentGQL: AllEquipmentGQL) { }

  ngOnInit(): void {
    this.allEquipment$ = this.allEquipmentGQL.fetch().pipe(pluck('data', 'equipmentCollection'));
  }

}
