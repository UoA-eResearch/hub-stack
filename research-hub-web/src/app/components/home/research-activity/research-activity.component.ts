import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import {
  AllStagesGQL,
  StageCollection,
  GetHomepageGQL,
  Homepage
} from '@graphql/schema';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {
  @Input() description: string;

  public title = 'Research Activities';
  public allStages$: Observable<StageCollection>;

  constructor(
    public allStagesGQL: AllStagesGQL,
    public searchBarService: SearchBarService
    ) {}

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
