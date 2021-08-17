import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { GetHomepageGQL } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { Subscription } from 'rxjs';
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

  public featuredItemsDescription: string;
  public browseDescription: string;
  public researchActivitiesDescription: string;

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
        this.featuredItemsDescription = result.featuredItemsDescription;
        this.browseDescription = result.researchCategories;
        this.researchActivitiesDescription = result.researchActivities;
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
