import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllEquipmentGQL, EquipmentCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  public equipment: EquipmentCollection;
  public title: string = 'Infrastructure Collection';

  private subscription = new Subscription();

  constructor(
    private allEquipmentGQL: AllEquipmentGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.equipment = collection)
    );
  }

  public loadContent(): Observable<EquipmentCollection> {
    return this.allEquipmentGQL.fetch().pipe(
      map((result) => result.data.equipmentCollection as EquipmentCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
