import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../search-bar/search-bar.service';
import { FeaturedComponent } from './featured/featured.component';
import { BrowseComponent } from './browse/browse.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private searchBarService: SearchBarService) {
  }

  ngOnInit() {
    enum CategoryId {
      All = 1,
      Support,
      Equipment,
      Training,
      Software,
      Facilities,
      Guide,
      Person,
      Policies,
      Articles,
      SubHubs
    }
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory(CategoryId.All);
  }
}
