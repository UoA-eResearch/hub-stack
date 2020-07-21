import { Component, OnInit } from '@angular/core';
import { AllEquipmentGQL, AllEquipmentQuery, AllSearchableContentPublicFieldsGQL, AllSearchableContentPublicFieldsQuery } from '../../graphql/schema';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  public allEquipment$: Observable<AllEquipmentQuery['equipmentCollection']>;
  public allSearchableContent$: Observable<AllSearchableContentPublicFieldsQuery>;

  constructor(public allEquipmentGQL: AllEquipmentGQL, public allSearchContentPublicFieldsGQL: AllSearchableContentPublicFieldsGQL) { }

  ngOnInit(): void {
    this.allEquipment$ = this.allEquipmentGQL.fetch().pipe(pluck('data', 'equipmentCollection'));
    this.allSearchableContent$ = this.allSearchContentPublicFieldsGQL.fetch().pipe(pluck('data'));
  }

}
