import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetHomepageGQL, Homepage } from '@graphql/schema';
import { flatMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public homepage$: Observable<Homepage>

  constructor(
    public getHomepageGQL: GetHomepageGQL,
    private router: Router
    ) { }

  ngOnInit() {
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
