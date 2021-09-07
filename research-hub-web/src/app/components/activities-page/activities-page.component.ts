import { Component, Input, OnInit } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import {
  AllStagesGQL,
  StageCollection
} from '@graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {
  public title: string = 'Research Activities';
  public description: string = 'From project inception to completion, explore what resources are available at each stage of the research lifecycle.';
  public allStages$: Observable<StageCollection>;

  constructor(
    public allStagesGQL: AllStagesGQL,
    public searchBarService: SearchBarService
  ) { }

  async ngOnInit() {
    this.allStages$ = this.getAllStages();
  }

  // Get all research stages
  public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }
}
