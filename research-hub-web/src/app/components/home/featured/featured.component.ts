import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllFeaturedItemsGQL, GetAllFeaturedItemsQuery } from '@graphql/schema';

type HomepageFeaturedItems = GetAllFeaturedItemsQuery['featuredItemsCollection']['items'][number]['itemsCollection'];

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() description: string;
  public featuredItems$: Observable<HomepageFeaturedItems>;

  constructor(
    public getAllFeaturedItemsGQL: GetAllFeaturedItemsGQL
  ) { }

  ngOnInit(){
    this.featuredItems$ = this.getAllFeaturedItemsGQL.fetch().pipe(
      map(x => x.data.featuredItemsCollection.items[0].itemsCollection)
    );
  }
}
