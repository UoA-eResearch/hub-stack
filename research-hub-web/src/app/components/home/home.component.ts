import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { GetHomepageGQL, GetHomepageQuery, Homepage } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('featured') featured: QueryList<ElementRef>;
  @ViewChild('categories') categories: QueryList<ElementRef>;
  @ViewChild('activities') activities: QueryList<ElementRef>;

  /**
   * Contact Section
   */
  // TODO this section should be in the CMS
  public title = "Contact";
  public description = "";
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public email = "eresearch-support@auckland.ac.nz";
  public phone = "+64 9 373 7599 ext 82231";

  public backgroundUrl: string;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public homeScrollService: HomeScrollService,
    private getHomepageGQL: GetHomepageGQL
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getHomepageGQL.fetch().pipe(
        map(x => x.data.homepageCollection.items[0])
      ).subscribe(result => {
        this.backgroundUrl = result.image.url;
      })
    )
  }

  ngAfterViewInit(): void {
    this.homeScrollService.setFeatured(this.featured['nativeElement']);
    this.homeScrollService.setCategories(this.categories['nativeElement']);
    this.homeScrollService.setActivities(this.activities['nativeElement']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
