import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
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

  public searchText = '';
  public title = "Find Services, Resources and People to accelerate your research";
  public aucklandUniUrl = 'https://auckland.ac.nz';

  constructor(
    public homeScrollService: HomeScrollService,
    public searchBarService: SearchBarService,
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

  // Adding search bar in here for now
  // TODO: refactor search bar
  search(): void {
    this.searchBarService.setSearchText(this.searchText);
    this.searchBarService.setCurrentPage(1);
    this.router.navigate(['/search']);
  }

  clearSearchText(): void {
    this.searchText = '';
    this.searchBarService.setSearchText('');
  }

}
