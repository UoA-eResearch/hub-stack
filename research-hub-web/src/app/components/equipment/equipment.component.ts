import { Component, OnInit } from '@angular/core';
import { EquipmentCollection, AllEquipmentGQL, AllSearchableContentPublicFieldsGQL, AllSearchableContentPublicFieldsQuery } from '../../graphql/schema';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  public allEquipment$: Observable<EquipmentCollection>;

  constructor(public allEquipmentGQL: AllEquipmentGQL) { }

  ngOnInit(): void {
    this.allEquipment$ = this.getAllEquipment();
  }

  public getAllEquipment() {
    try {
      return this.allEquipmentGQL.fetch()
        .pipe(pluck('data', 'equipmentCollection')) as Observable<EquipmentCollection>;
    } catch (e) {
      console.log('Error loading equipment:', e);
    }
  }

}
