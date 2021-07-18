import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetFeaturedItemsGQL, GetFeaturedItemsQuery } from '@graphql/schema';

type HomepageFeaturedItems = GetFeaturedItemsQuery['homepageCollection']['items'][number];

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public featuredItems$: Observable<HomepageFeaturedItems>;

  constructor(
    public getFeaturedItemsGQL: GetFeaturedItemsGQL
  ) { }

  ngOnInit(){
    this.featuredItems$ = this.getFeaturedItemsGQL.fetch().pipe(
      map(x => x.data.homepageCollection.items[0])
    );
  }
}
