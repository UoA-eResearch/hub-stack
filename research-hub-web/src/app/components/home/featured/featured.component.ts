import {Component, OnInit} from '@angular/core';
import {ResearchHubApiService, ContentItemsParams} from 'app/services/research-hub-api.service';
import {Content} from 'app/model/Content';
import { AnalyticsService } from 'app/services/analytics.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  content: Content;
  private featuredContentIndex: number; // Set in ngOnInit() to undefined || content item index number

  constructor(private apiService: ResearchHubApiService, public analyticsService: AnalyticsService)  {

  }

  ngOnInit() {
    const params = new ContentItemsParams();
    params.setSize(1); // we only want to find out the total number of content items so just return 1 element

    this.apiService.getContentItems(params).subscribe(
      page => {
        const totalContentItems = page.totalElements;
        /**
         * If featuredContentIndex is set then the homepage will display 'Featured content' and the corresponding content item
         * If featuredContentIndex === undefined, then the homepage will display 'Have you seen...' and a random content item
         */
        this.featuredContentIndex = undefined; // undefined || content item index number
        const contentItemIndex = Math.floor(Math.random() * (totalContentItems - 1)) + 1; // used if featuredContentIndex === undefined

        this.apiService.getContent(this.featuredContentIndex || contentItemIndex).subscribe(content => {
          this.content = content;
        });
      }
    );
  }
}
