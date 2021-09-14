import { Component, OnInit } from '@angular/core';
import { GetHomepageGQL, Homepage } from '@app/graphql/schema';
import { HomeScrollService } from '@services/home-scroll.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public homePage$: Observable<Homepage>;

  constructor(
    public homeScrollService: HomeScrollService,
    private getHomepageGQL: GetHomepageGQL
  ) { }

  ngOnInit(): void {
    this.homePage$ = this.getHomepageGQL.fetch().pipe(
      map(x => x.data.homepageCollection.items[0]) 
    ) as Observable<Homepage>;
  }
}
