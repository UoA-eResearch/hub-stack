import { Component, OnInit } from '@angular/core';
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
  public title = 'Research Activities';
  public description = '';
  public allStages$: Observable<StageCollection>;
  
  constructor(
    public allStagesGQL: AllStagesGQL,
    public searchBarService: SearchBarService,
    public getHomepageGQL: GetHomepageGQL
    ) {}

  async ngOnInit() {
    this.allStages$ = this.getAllStages();
    this.getHomepage().subscribe(data => {
      this.description = data.researchActivities;
    })
  }

  // Get homepage data
  public getHomepage(): Observable<Homepage> {
    try {
      return this.getHomepageGQL.fetch()
        .pipe(flatMap(x => x.data.homepageCollection.items)) as Observable<Homepage>
    } catch (e) { console.error('Error loading homepage:', e) };
  }

  // Get all research stages
  public getAllStages(): Observable<StageCollection> {
    try {
      return this.allStagesGQL.fetch()
        .pipe(pluck('data', 'stageCollection')) as Observable<StageCollection>
    } catch (e) { console.error('Error loading all stages:', e) };
  }
}