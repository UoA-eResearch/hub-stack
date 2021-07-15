import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { HomeScrollService } from '@services/home-scroll.service';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent {
  @Input() url: string;

  searchText = '';
  title = "Welcome to the ResearchHub";
  summary = "The ResearchHub connects you with people, resources, and services from across the University to enhance and accelerate your research.";


  constructor(
    public homeScrollService: HomeScrollService,
    public searchBarService: SearchBarService,
    private router: Router
  ) { }

  // Adding search bar in here for now
  // TODO: refactor search bar
  search() {
    this.searchBarService.setSearchText(this.searchText);
    this.searchBarService.setCurrentPage(1);
    this.router.navigate(['/search']);
  }

  clearSearchText() {
    this.searchText = '';
    this.searchBarService.setSearchText('');
  }

}
