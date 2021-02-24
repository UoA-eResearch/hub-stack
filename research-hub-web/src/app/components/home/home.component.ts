import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../search-bar/search-bar.service';
import { Message } from '../../global/global-variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // About
  public quote = Message;
  public director = "- Mark Gahegan, Director of Centre for eResearch";

  // Contact
  public title = "Contact";
  public description = "If you want to get in touch you can ring us, write to us or even visit us. We'd love to hear from you.";
  public email = "eresearch-support@auckland.ac.nz";
  public phone = "+64 9 373 7599 ext 82231";
  public  building = "assets/images/cer-level5-20170905.svg";
  public userStudyLink = "https://docs.google.com/forms/d/e/1FAIpQLSeXhrPKLqmdAr_r3aUwY9zyPa5REWJs63FQdmNwRbXKBUS8WQ/viewform";
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";

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
