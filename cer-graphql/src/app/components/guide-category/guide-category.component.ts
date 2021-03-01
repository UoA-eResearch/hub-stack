import { Component, OnInit } from '@angular/core';
import { GuideCategory } from '@model/GuideCategory';
import { ActivatedRoute } from '@angular/router';
import { ResearchHubApiService } from '@services/research-hub-api.service';
import { Location } from '@angular/common';
import { AnalyticsService } from '@services/analytics.service';
import { AppComponentService } from '@app/app.component.service';
import { Content } from '@model/Content';
import { ContentTypeId } from '@app/global/global-variables';

@Component({
  selector: 'app-guide-category',
  templateUrl: './guide-category.component.html',
  styleUrls: ['./guide-category.component.scss']
})
export class GuideCategoryComponent implements OnInit {

  contentItems: Content[];
  guideCategory: GuideCategory;
  readonly CONTENT_TYPE_ID_GUIDE: ContentTypeId = ContentTypeId.Guide;

  constructor(private route: ActivatedRoute, public apiService: ResearchHubApiService, private location: Location,
    private analyticsService: AnalyticsService, private appComponentService: AppComponentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['guideCategoryId'];

      this.apiService.getGuideCategory(id).subscribe(
        guideCategory => {
          const url = this.location.path();
          const name = guideCategory.name;

          this.appComponentService.setTitle(name);

          this.analyticsService.trackGuideCategory(name, url);
          this.guideCategory = guideCategory;
        }
      );

      this.apiService.getGuideCategoryContentItems(id).subscribe(
        contentItems => {
          this.contentItems = contentItems;
        }
      );
    });
  }
}
