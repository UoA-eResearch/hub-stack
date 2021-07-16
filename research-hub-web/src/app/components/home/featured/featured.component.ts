import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetFeaturedItemsGQL, GetFeaturedItemsQuery } from '@graphql/schema';

type FeaturedItems = GetFeaturedItemsQuery['homepageCollection']['items'][0];

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public featuredItems$: Observable<FeaturedItems>;

  constructor(
    public getFeaturedItemsGQL: GetFeaturedItemsGQL,
    public router: Router
  ) { }

  ngOnInit(){
    this.featuredItems$ = this.getFeaturedItemsGQL.fetch().pipe(
      map(x => x.data.homepageCollection.items[0])
    );
  }
}
