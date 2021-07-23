import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Category, Stage } from '@app/graphql/schema';
import { LoginService } from '@uoa/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
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

  toggle(): void {
    this.sideNav.toggle();
  }

  searchByCategory(id: string) {
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory([id]);
    console.log(id);
  }

}
