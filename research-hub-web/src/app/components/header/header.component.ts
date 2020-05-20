import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from './header.service';
import {Subscription} from 'rxjs';
import {ResearchHubApiService} from '../../services/research-hub-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public title: string;
  public description: string;
  public imageUrl: string;
  public isVisible: boolean;

  private headerChangeSub: Subscription;

  constructor(public headerService: HeaderService, private apiService: ResearchHubApiService) {

  }

  ngOnInit() {
    this.headerChangeSub = this.headerService.batchParamsChange.subscribe(params => {
      this.title = params.title;
      this.description = params.description;
      this.imageUrl = params.imageUrl;
      this.isVisible = params.isVisible;
    });
  }

  ngOnDestroy() {
    this.headerChangeSub.unsubscribe();
  }

  getBackgroundStyle(imageUrl: string) {
    if (imageUrl !== undefined) {
      return {'background-image': 'url(' + this.apiService.getAssetUrl(imageUrl) + ')'};
    } else {
      return {};
    }
  }

  getInfoStyle(imageUrl: string) {
    if (imageUrl !== undefined) {
      return {'margin-bottom': '6em'};
    } else {
      return {};
    }
  }
}
