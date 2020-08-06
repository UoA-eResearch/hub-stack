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

  constructor(public allEquipmentGQL: AllEquipmentGQL) { }

  ngOnInit(): void {
    try {
      this.allEquipment$ = this.allEquipmentGQL.fetch()
        .pipe(pluck('data', 'equipmentCollection'));
    } catch (e) { console.log('Error loading equipment:', e); }
  }

}
