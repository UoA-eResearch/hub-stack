import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import {
  AllStagesGQL,
  StageCollection
} from '@graphql/schema';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';

@Component({
  selector: 'app-research-activity',
  templateUrl: './research-activity.component.html',
  styleUrls: ['./research-activity.component.scss']
})
export class ResearchActivityComponent implements OnInit {
  public title = 'Research Activities';
  public description = 'The research lifecycle describes the research journey from project inception to completion. It highlights five project stages. Below you can explore what the University of Auckland provides to support you according to where you are in your research journey.';
  public allStages$: Observable<StageCollection>;
  
  constructor(
    public allStagesGQL: AllStagesGQL,
    public searchBarService: SearchBarService
    ) {}

  async ngOnInit() {
    // Get All Categories
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