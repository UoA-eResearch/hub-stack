import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllProtectedArticlesGQL, ArticleCollection,
    AllProtectedCapabilitiesGQL, CapabilityCollection,
    AllProtectedCaseStudiesGQL, CaseStudyCollection,
    AllProtectedEquipmentGQL, EquipmentCollection,
    AllProtectedEventsGQL, EventCollection,
    AllProtectedFundingGQL,FundingCollection,
    AllProtectedServicesGQL, ServiceCollection,
    AllProtectedSoftwareGQL, SoftwareCollection,
    AllProtectedSubHubGQL, SubHubCollection
 } from '@app/graphql/schema';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-protected-pages-list',
  templateUrl: './protected-pages-list.component.html',
  styleUrls: ['./protected-pages-list.component.scss']
})
export class ProtectedPagesListComponent implements OnInit, OnDestroy {
  public protectedPages: any;
  public protectedArticles: any;
  public protectedCapabilities: any;
  public protectedCaseStudies: any;
  public protectedEquipment: any;
  public protectedEvents: any;
  public protectedFunding: any;
  public protectedServices: any;
  public protectedSoftware: any;
  public protectedSubHub: any;
  public title: string = 'Protected Pages Collection';

  private subscription = new Subscription();

  constructor(
    private allProtectedArticlesGQL: AllProtectedArticlesGQL,
    private allProtectedCapabilitiesGQL: AllProtectedCapabilitiesGQL,
    private allProtectedCaseStudiesGQL: AllProtectedCaseStudiesGQL,
    private allProtectedEquipmentGQL: AllProtectedEquipmentGQL,
    private allProtectedEventsGQL: AllProtectedEventsGQL,
    private allProtectedFundingGQL: AllProtectedFundingGQL,
    private allProtectedServicesGQL: AllProtectedServicesGQL,
    private allProtectedSoftwareGQL: AllProtectedSoftwareGQL,
    private allProtectedSubHubGQL: AllProtectedSubHubGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = this.title;
    this.subscription.add(
      this.loadArticles().subscribe((collection) => this.protectedArticles = collection)
    );
    this.subscription.add(
      this.loadCapabilities().subscribe((collection) => this.protectedCapabilities = collection)
    );
    this.subscription.add(
      this.loadCaseStudies().subscribe((collection) => this.protectedCaseStudies = collection)
    );
    this.subscription.add(
      this.loadEquipment().subscribe((collection) => this.protectedEquipment = collection)
    );
    this.subscription.add(
      this.loadEvents().subscribe((collection) => this.protectedEvents = collection)
    );
    this.subscription.add(
      this.loadFunding().subscribe((collection) => this.protectedFunding = collection)
    );
    this.subscription.add(
      this.loadServices().subscribe((collection) => this.protectedServices = collection)
    );
    this.subscription.add(
      this.loadSoftware().subscribe((collection) => this.protectedSoftware = collection)
    );
    this.subscription.add(
      this.loadSubHub().subscribe((collection) => this.protectedSubHub = collection)
    );
  }

  public loadArticles(): Observable<ArticleCollection> {
    return this.allProtectedArticlesGQL.fetch().pipe(
      map((result) => result.data.articleCollection as ArticleCollection)
    )
  }

  public loadCapabilities(): Observable<CapabilityCollection> {
    return this.allProtectedCapabilitiesGQL.fetch().pipe(
      map((result) => result.data.capabilityCollection as CapabilityCollection)
    )
  }

  public loadCaseStudies(): Observable<CaseStudyCollection> {
    return this.allProtectedCaseStudiesGQL.fetch().pipe(
      map((result) => result.data.caseStudyCollection as CaseStudyCollection)
    )
  }

  public loadEquipment(): Observable<EquipmentCollection> {
    return this.allProtectedEquipmentGQL.fetch().pipe(
      map((result) => result.data.equipmentCollection as EquipmentCollection)
    )
  }

  public loadEvents(): Observable<EventCollection> {
    return this.allProtectedEventsGQL.fetch().pipe(
      map((result) => result.data.eventCollection as EventCollection)
    )
  }

  public loadFunding(): Observable<FundingCollection> {
    return this.allProtectedFundingGQL.fetch().pipe(
      map((result) => result.data.fundingCollection as FundingCollection)
    )
  }

  public loadServices(): Observable<ServiceCollection> {
    return this.allProtectedServicesGQL.fetch().pipe(
      map((result) => result.data.serviceCollection as ServiceCollection)
    )
  }

  public loadSoftware(): Observable<SoftwareCollection> {
    return this.allProtectedSoftwareGQL.fetch().pipe(
      map((result) => result.data.softwareCollection as SoftwareCollection)
    )
  }

  public loadSubHub(): Observable<SubHubCollection> {
    return this.allProtectedSubHubGQL.fetch().pipe(
      map((result) => result.data.subHubCollection as SubHubCollection)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
