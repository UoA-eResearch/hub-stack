import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllSubHubGQL, SubHubCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable, Subscription } from 'rxjs';
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
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.subhubs = collection)
    );
  }

  public loadContent(): Observable<SubHubCollection> {
    return this.allSubhubGQL.fetch().pipe(
      map((result) => result.data.subHubCollection as SubHubCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
