import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetBannerImageGQL } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {
  public bannerImageUrl$: Observable<string>;
  public logoImageUrl$: Observable<string>;

  public title = "Find Services, Resources and People to accelerate your research";
  public aucklandUniUrl = 'https://auckland.ac.nz';

  constructor(
    public homeScrollService: HomeScrollService,
    private router: Router,
    private getBannerImageGQL: GetBannerImageGQL
  ) { }

  ngOnInit(): void {
    this.bannerImageUrl$ = this.getBannerImageGQL.fetch().pipe(
      map(x => x.data.homepageCollection.items[0].image.url),
      // we detect webP in the async request for the URL, because it seems to be required for css background to work properly
      switchMap(async url => (await supportsWebP) ? url + '?fm=webp' : url)
    )

    // TODO: get UoA logo image url from CMS
  }
}
