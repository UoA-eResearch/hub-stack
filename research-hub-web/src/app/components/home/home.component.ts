import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../search-bar/search-bar.service';
import { FeaturedComponent } from './featured/featured.component';
import { BrowseComponent } from './browse/browse.component';
import { CategoryId } from '@app/global/global-variables';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private searchBarService: SearchBarService) {
  }

  ngOnInit() {
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory(CategoryId.All);
  }
}
