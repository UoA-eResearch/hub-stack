import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '@services/search.service';
import {
  AllStagesGQL,
  StageCollection,
  GetHomepageGQL
} from '@graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit, OnDestroy {
  public title: string = 'Research Activities';
  public description: string;
  public allStages$: Observable<StageCollection>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public allStagesGQL: AllStagesGQL,
    private getHomepageGQL: GetHomepageGQL,
    public searchService: SearchService
  ) { }

  ngOnInit() {
    this.allStages$ = this.getAllStages();
    this.subscriptions.add(
      this.getHomepageGQL.fetch().pipe(
        map(x => x.data.homepageCollection.items[0])
      ).subscribe(result => {
        this.description = result.researchActivities;
      })
    )
  }

  // Get all research stages
  public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
