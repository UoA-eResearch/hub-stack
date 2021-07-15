import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { GetBannerImageGQL } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {
  public bannerImageUrl$: Observable<string>;

  public searchText = '';
  public title = "Welcome to the ResearchHub";
  public summary = "The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research.";


  constructor(
    public homeScrollService: HomeScrollService,
    public searchBarService: SearchBarService,
    private router: Router,
    private getBannerImageGQL: GetBannerImageGQL
  ) { }

  ngOnInit(): void {
    this.bannerImageUrl$ = this.getBannerImageGQL.fetch().pipe(
      map(x => x.data.homepageCollection.items[0].image.url)
    )
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
