import { Component, OnInit } from '@angular/core';
import { GetHomepageGQL, Homepage } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public homePage$: Observable<Homepage> | undefined;

  constructor(
    private getHomepageGQL: GetHomepageGQL,
    public pageTitleService: PageTitleService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = '';
    this.homePage$ = this.getHomepageGQL.fetch().pipe(
      map(x => x?.data?.homepageCollection?.items[0]) 
    ) as Observable<Homepage>;
  }
}
