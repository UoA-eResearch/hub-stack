import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../search-bar/search-bar.service';
import { Message } from '../../global/global-variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public message = Message;
  public director = "- Mark Gahegan";

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
