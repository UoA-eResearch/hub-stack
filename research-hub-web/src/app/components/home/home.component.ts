import { Component, OnInit } from '@angular/core';
import { CategoryId, OptionsService } from '../../services/options.service';
import { SearchBarService } from '../search-bar/search-bar.service';
import { FeaturedComponent } from './featured/featured.component';
import { BrowseComponent } from './browse/browse.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public optionsService: OptionsService, private searchBarService: SearchBarService) {
  }

  ngOnInit() {
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory(CategoryId.All);
  }
}
