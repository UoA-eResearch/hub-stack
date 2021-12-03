import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsItemsCollection, FeaturedItemsItemsItem, GetAllFeaturedItemsGQL, Maybe } from '@graphql/schema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { notEmpty } from '@app/global/notEmpty';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() title: Maybe<string>;
  public featuredItems$: Observable<FeaturedItemsItemsCollection>;

  constructor(
    public getAllFeaturedItemsGQL: GetAllFeaturedItemsGQL
  ) { }

  ngOnInit() {
    this.featuredItems$ = this.getAllFeaturedItemsGQL.fetch().pipe(
      map(x => x?.data?.featuredItemsCollection?.items[0]?.itemsCollection as FeaturedItemsItemsCollection)
    );
  }

  public filterOutNulls(arrayWithNulls: Array<Maybe<FeaturedItemsItemsItem>>) : Array<FeaturedItemsItemsItem> {
    return arrayWithNulls.filter(notEmpty);
  }
}
