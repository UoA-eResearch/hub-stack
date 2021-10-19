import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllCaseStudiesGQL, CaseStudyCollection } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-case-study-list',
  templateUrl: './case-study-list.component.html',
  styleUrls: ['./case-study-list.component.scss']
})
export class CaseStudyListComponent implements OnInit, OnDestroy {
  public caseStudies: CaseStudyCollection

  private subscription = new Subscription();

  constructor(
    private allCaseStudiesGQL: AllCaseStudiesGQL
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.allCaseStudiesGQL.fetch().pipe(
      map((result) => result.data.caseStudyCollection as CaseStudyCollection)
    ).subscribe((collection) => this.caseStudies = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
