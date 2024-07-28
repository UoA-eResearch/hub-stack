import { Location } from '@angular/common';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LoginService, UserInfoDto } from '@uoa/auth';
import { from, Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';


// dropdown test
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchBar') searchBar: SearchBarComponent;


  // dropdown test
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;

  public currentUrl: string = '/';
  public showMobileSearch: boolean = false;
  public skipLinkPathSearch: string;
  public skipLinkPathMainContent: string;

  // dropdown test
  public showDropdown: boolean = false;



  public userInfo$: Observable<UserInfoDto>;
  public loggedIn$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    public loginService: LoginService,
    public location: Location,

    // dropdown test
    private renderer: Renderer2


  ) {
    // set the initial skip link paths
    this.skipLinkPathSearch = `${this.location.path(false)}#search`;
    this.skipLinkPathMainContent = `${this.location.path(false)}#main-content`;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      ).subscribe({
        next: (event: NavigationEnd) => {
          this.currentUrl = event.urlAfterRedirects;

          setTimeout(() => {
            // set the skip link urls dynamically
            // we have to wait for dynamic urls (e.g. subhub child pages) to resolve
            this.skipLinkPathSearch = `${this.location.path(false)}#search`;
            this.skipLinkPathMainContent = `${this.location.path(false)}#main-content`;
          }, 500);
        }
      })
    );

    this.loggedIn$ = from(this.loginService.isAuthenticated()).pipe(
      switchMap(() => this.loginService.loggedIn$)
    );

    this.userInfo$ = this.loginService.userInfo$.pipe(
      filter(userInfo => userInfo !== null && userInfo !== undefined),
      tap(userInfo => this.sendGoogleAnalyticsUserInfo(userInfo))
);
  }

  private sendGoogleAnalyticsUserInfo(userInfo: UserInfoDto): void {
    // window.dataLayer.push({
    //   'user': JSON.stringify(userInfo),
    //   ...userInfo,
    // });

    // groups disabled for now, as there is a bug in the UoA auth library
    // if (userInfo.groups) {
    //   console.log(userInfo.groups);
    //   JSON.parse(`${userInfo.groups}`).map(group => {
    //     const groupObj = {};
    //     group = group.trim().split('.')[0];
    //     groupObj[group] = group;
    //     console.log(groupObj);
    //     window.dataLayer.push(groupObj);
    //   })
    // }
  }

  public toggleMobileSearchBar(): void {
    this.showMobileSearch = !this.showMobileSearch;
  }



  // dropdown test
  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      // ドロップダウンを表示する処理
      this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
      setTimeout(() => {
        const menuItems = this.dropdownMenu.nativeElement.querySelectorAll('a.mat-button');
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            this.renderer.setStyle(item, 'opacity', '1');
            this.renderer.setStyle(item, 'transform', 'translateY(0)');
          }, index * 50);  // 各項目を50ミリ秒ずつ遅延させてアニメーション
        });
      }, 50);
    } else {
      // ドロップダウンを非表示にする処理
      const menuItems = this.dropdownMenu.nativeElement.querySelectorAll('a.mat-button');
      menuItems.forEach((item) => {
        this.renderer.setStyle(item, 'opacity', '0');
        this.renderer.setStyle(item, 'transform', 'translateY(-20px)');
      });
      setTimeout(() => {
        this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
      }, 300);  // アニメーション完了後にクラスを削除
    }
  }

  // 変更点4: closeDropdown メソッドを修正
  public closeDropdown(): void {
    if (this.showDropdown) {
      this.toggleDropdown();
    }
  }

  public navigateToResearchStage(): void {
    this.router.navigate(['/stage']);
    this.closeDropdown();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
