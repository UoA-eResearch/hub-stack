import { Component } from '@angular/core';
import { ResearchHubApiService } from '@services/research-hub-api.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public title: String = "About";
  public summary: String = "The Centre for eResearch comprises a team of highly qualified research and technical staff dedicated to the delivery of advanced computational solutions to help power the University's research mission.";
  public coverImageUrl: String = 'url(assets/images/banner15.jpg)';

  theDirectorUrl = this.apiService.getAssetUrl('page-elements/mark.jpg');

  constructor(private apiService: ResearchHubApiService) {

  }
}
