import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllFundingGQL, FundingCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-funding-list',
  templateUrl: './funding-list.component.html',
  styleUrls: ['./funding-list.component.scss']
})
export class FundingListComponent implements OnInit, OnDestroy {
  public fundings: FundingCollection;
  public title: string = 'Funding Collection';

  private subscription = new Subscription();

  constructor(
    private allFundingGQL: AllFundingGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.fundings = collection)
    );
  }

  public loadContent(): Observable<FundingCollection> {
    return this.allFundingGQL.fetch().pipe(
      map((result) => result.data.fundingCollection as FundingCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
