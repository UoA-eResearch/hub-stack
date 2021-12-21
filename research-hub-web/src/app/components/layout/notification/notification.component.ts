import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL, GetNotificationPublishedVersionGQL, Maybe } from '@app/graphql/schema';
import { Document } from '@contentful/rich-text-types';
import { AppStorageService } from '@services/app-storage.service';
import { NotificationService } from '@services/notification.service';
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

  public showNotification = false;
  public notification: Document | null = null;

  constructor(
    private notificationService: NotificationService,
    private storageService: AppStorageService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.notificationService.getNotification.subscribe((result) => {
        if (result) {
          this.notification = result.json;
          this.showNotification = true;
        }
      })
    );

  }

  close(): void {
    this.storageService.setItem(
      this.notificationService.NOTIFICATION_STORAGE_KEY,
      this.notificationService.publishedVersion
    ).then(() => {
      this.showNotification = false;
    }).finally(() => {
      this.showNotification = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
