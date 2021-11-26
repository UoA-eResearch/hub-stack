import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL } from '@app/graphql/schema';
import { Document } from '@contentful/rich-text-types';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="notification && showNotification && !hasBeenDismissed"
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
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public showNotification = false;
  public hasBeenDismissed = false;
  public notification: Document | null = null;

  constructor(
    private getNotificationGQL: GetNotificationGQL
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getNotificationGQL.fetch().pipe(
        map((result) => result.data.homepageCollection.items[0].notification),
        filter((result) => result !== null)
      ).subscribe((result) => {
        this.notification = result.json;

        this.showNotification = true;
      })
    );

  }

  close(): void {
    this.showNotification = false;
    this.hasBeenDismissed = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
