import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllSubHubGQL, SubHubCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subhub-list',
  templateUrl: './subhub-list.component.html',
  styleUrls: ['./subhub-list.component.scss']
})
export class SubhubListComponent implements OnInit, OnDestroy {
  public subhubs: SubHubCollection;
  public title: string = 'Sub Hub Collection';

  private subscription = new Subscription();

  constructor(
    private allSubhubGQL: AllSubHubGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(this.allSubhubGQL.fetch().pipe(
      map((result) => result.data.subHubCollection as SubHubCollection)
    ).subscribe((collection) => this.subhubs = collection));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
