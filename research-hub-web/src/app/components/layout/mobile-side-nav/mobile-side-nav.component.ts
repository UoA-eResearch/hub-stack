import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Category, Stage } from '@app/graphql/schema';
import { LoginService } from '@uoa/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-mobile-side-nav',
  templateUrl: './mobile-side-nav.component.html',
  styleUrls: ['./mobile-side-nav.component.scss']
})
export class MobileSideNavComponent implements OnInit {
  @ViewChild('sidenav') sideNav: MatSidenav;
  @Input() allCategories: Category[] = [];
  @Input() allStages: Stage[] = [];
  @Input() currentUrl: string;

  public allCategories$: Observable<Category[]> | null = null;
  public allStages$: Observable<Stage[]> | null = null;

  constructor(
    public searchBarService: SearchBarService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.sideNav.toggle();
  }

  searchByCategory(id: string) {
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory([id]);
    console.log(id);
  }

}
