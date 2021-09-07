import { Component, Input, OnInit } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import {
  AllStagesGQL,
  StageCollection
} from '@graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {
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
