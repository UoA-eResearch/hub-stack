import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL, GetNotificationPublishedVersionGQL, Maybe } from '@app/graphql/schema';
import { Document } from '@contentful/rich-text-types';
import { AppStorageService } from '@services/app-storage.service';
import { from, iif, Observable, Subscription } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="notification && showNotification"
      [@slideInOut]
      class="notification-bar-container mat-elevation-z6"
      fxLayout="row"
      role="notification" aria-labelledby="notification-text" tabindex="0"
    >
      <div class="notification-bar-content">
        <div id="notification-text">
          <ngx-contentful-rich-text [document]="notification"></ngx-contentful-rich-text>
        </div>
      </div>
      <button mat-button aria-label="close-notification" (click)="close()" (keydown.enter)="close()"><mat-icon>close</mat-icon></button>
    </div>
  `,
  styleUrls: ['notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ]

    )
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private readonly NOTIFICATION_STORAGE_KEY = 'notification/publishedVersion'
  private publishedVersion?: number | null;

  public showNotification = false;
  public notification: Document | null = null;

  constructor(
    private getNotification: GetNotificationGQL,
    private getNotificationPublishedVersion: GetNotificationPublishedVersionGQL,
    private storageService: AppStorageService
  ) { }

  ngOnInit(): void {
    const $equalsStoredValue = (publishedVersion?: number | null): Observable<boolean> =>
      from(this.storageService.getItem(this.NOTIFICATION_STORAGE_KEY)).pipe(
        map((storedVersion) => publishedVersion === parseInt(storedVersion))
      )

    const $getNotificationPublishedVersion = this.getNotificationPublishedVersion.fetch().pipe(
      map((result) => result.data.homepageCollection?.items[0]?.sys.publishedVersion)
    )

    const $requestNotification = $getNotificationPublishedVersion.pipe(
      mergeMap((result) => $equalsStoredValue(result)),
      switchMap((isEqual) => iif(
        () => !isEqual,
        $getNotification
      ))
    )

    const $getNotification = this.getNotification.fetch().pipe(
      tap((result) => this.publishedVersion = result.data.homepageCollection?.items[0]?.sys.publishedVersion),
      map((result) => result.data.homepageCollection?.items[0]?.notification),
      filter((result) => result !== null),
    )

    this.subscriptions.add(
      $requestNotification.subscribe((result) => {
        if (result) {
          this.notification = result.json;
          this.showNotification = true;
        }
      })
    );

  }

  close(): void {
    this.storageService.setItem(this.NOTIFICATION_STORAGE_KEY, this.publishedVersion)
      .then(() => {
        this.showNotification = false;
      })
      .finally(() => {
        this.showNotification = false;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
