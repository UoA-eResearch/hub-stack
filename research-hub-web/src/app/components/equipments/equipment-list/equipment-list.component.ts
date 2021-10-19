import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllEquipmentGQL, EquipmentCollection } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  public equipment: EquipmentCollection;

  private subscription = new Subscription();

  constructor(
    private allEquipmentGQL: AllEquipmentGQL
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.allEquipmentGQL.fetch().pipe(
      map((result) => result.data.equipmentCollection as EquipmentCollection)
    ).subscribe((collection) => this.equipment = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
