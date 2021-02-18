import { Component, OnInit, HostListener } from '@angular/core';
import { AllSubHubGQL, SubHubCollection } from '@app/graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public title = 'Featured Topics';
  public description = "The thing you learn about learning is that there's always more to learn! Here are the highlights of what we are all learning together in the research community at the University of Auckland.";
  public allSubHubs$: Observable<SubHubCollection>;

  screenHeight: number;
  screenWidth: number;

  constructor(public allSubHubGQL: AllSubHubGQL) { this.onResize(); }

  async ngOnInit(){
    this.allSubHubs$ = this.getAllSubHubs();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  /**
   * Runs the query for the main body of a subhub item as including it's child pages but excluding it's ancestor/parent data.
   * @param slug Page slug
   */
  public getAllSubHubs(): Observable<SubHubCollection> {
    try {
      return this.allSubHubGQL.fetch()
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

}
