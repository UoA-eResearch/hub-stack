import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Document } from '@contentful/rich-text-types';
import { NotificationService } from '@services/notification.service';
import { Subscription } from 'rxjs';

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
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.notificationService.getNotification().subscribe((result) => {
        if (result) {
          this.notification = result.json;
          this.showNotification = true;
        }
      })
    );

  }

  close(): void {
    this.notificationService
      .storeCurrentNotificationVersion()
      .then(() => {
        this.showNotification = false;
      }).catch((e) => {
        console.log(e);
        this.showNotification = false;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
