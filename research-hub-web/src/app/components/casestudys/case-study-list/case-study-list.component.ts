import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllCaseStudiesGQL, CaseStudyCollection } from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-case-study-list',
  templateUrl: './case-study-list.component.html',
  styleUrls: ['./case-study-list.component.scss']
})
export class CaseStudyListComponent implements OnInit, OnDestroy {
  public caseStudies: CaseStudyCollection;
  public title: string = 'Case Study Collection';

  private subscription = new Subscription();

  constructor(
    private allCaseStudiesGQL: AllCaseStudiesGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.caseStudies = collection)
    );
  }

  public loadContent(): Observable<CaseStudyCollection> {
    return this.allCaseStudiesGQL.fetch().pipe(
      map((result) => result.data.caseStudyCollection as CaseStudyCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
