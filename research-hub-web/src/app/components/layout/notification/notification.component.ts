import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="notification && showNotification && !hasBeenDismissed"
      class="notification-bar-container mat-elevation-z6"
      fxLayout="row"
    >
      <div class="notification-bar-content">
        <div aria-label="notification" tabindex="0" [innerHTML]="notification | richTextToHTML"></div>
      </div>
      <mat-icon aria-label="close notification" tabindex="0" (click)="close()" (keydown.enter)="close()">close</mat-icon>
    </div>
  `,
  styleUrls: ['notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public showNotification = false;
  public hasBeenDismissed = false;
  public notification: JSON | null = null;

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
