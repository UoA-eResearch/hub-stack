import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
import { GetHomepageGQL, Homepage } from '@graphql/schema';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public homepage$: Observable<Homepage>;

  constructor(
    public getHomepageGQL: GetHomepageGQL,
    public router: Router) { }

  ngOnInit(){
    // Get Homepage Image
    this.homepage$ = this.getHomepage();
  }

  // Get homepage
  public getHomepage(): Observable<Homepage> {
    try {
      return this.getHomepageGQL.fetch()
        .pipe(flatMap(x => x.data.homepageCollection.items), catchError(() => (this.router.navigate(['/error/500'])))) as Observable<Homepage>
    } catch (e) { console.error('Error loading homepage:', e) };
  }
}
