import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetHomepageGQL, Homepage } from '@app/graphql/schema';
import { PageTitleService } from '@services/page-title.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public homePage$: Observable<Homepage> | undefined;

  constructor(
    private getHomepageGQL: GetHomepageGQL,
    public pageTitleService: PageTitleService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitleService.title = '';
    this.homePage$ = this.getHomepageGQL.fetch().pipe(
      map(x => x?.data?.homepageCollection?.items[0]),
      catchError(err => {
        const status: number = err['status'] ? err['status'] : 500;
        this.router.navigate(['error', status]);
        return throwError(err);
      })
    ) as Observable<Homepage>;
  }
}
