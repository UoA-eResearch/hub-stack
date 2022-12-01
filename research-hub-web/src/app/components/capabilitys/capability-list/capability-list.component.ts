import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllCapabilitiesGQL, CapabilityCollection } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-capability-list',
  templateUrl: './capability-list.component.html',
  styleUrls: ['./capability-list.component.scss']
})
export class CapabilityListComponent implements OnInit, OnDestroy {
  public capabilities: CapabilityCollection;
  public title: string = 'Capability Collection';

  private subscription = new Subscription();

  constructor(
    private allCapabilitiesGQL: AllCapabilitiesGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadContent().subscribe((collection) => this.capabilities = collection)
    );
  }

  public loadContent(): Observable<CapabilityCollection> {
    return this.allCapabilitiesGQL.fetch().pipe(
      map((result) => result.data.capabilityCollection as CapabilityCollection),
      tap((c) => console.log(c))
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
