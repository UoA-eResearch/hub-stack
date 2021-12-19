import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '@services/search.service';
import {
  AllStagesGQL,
  GetHomepageGQL,
  Maybe,
  Stage
} from '@graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleService } from '@services/page-title.service';
import { notEmpty } from '@app/global/notEmpty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit, OnDestroy {
  public title: string = 'Research Activities';
  public description: Maybe<string> | undefined;
  public allStages$: Observable<Stage[]>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public allStagesGQL: AllStagesGQL,
    private getHomepageGQL: GetHomepageGQL,
    public searchService: SearchService,
    public pageTitleService: PageTitleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageTitleService.title = this.title;
    this.allStages$ = this.getAllStages();
    this.subscriptions.add(
      this.getHomepageGQL.fetch().pipe(
        map(x => x?.data?.homepageCollection?.items[0])
      ).subscribe({
        next: result => {
          this.description = result?.researchActivities;
        },
        error: err => {
          console.error(err);
          const status: number = err['status'] ? err['status'] : 500;
          this.router.navigate(['error', status]);
        }
      })
    )
  }

  // Get all research stages
  public getAllStages(): Observable<Stage[]> {
    return this.allStagesGQL.fetch().pipe(
      map(result => result?.data?.stageCollection?.items.filter(notEmpty) as Stage[])
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
