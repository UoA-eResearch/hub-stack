import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="showNotification && !hasBeenDismissed"
      class="notification-bar-container mat-elevation-z6"
      fxLayout="row"
    >
      <div class="notification-bar-content">
        <div [innerHTML]="this.notification | richTextToHTML"></div>
      </div>
      <mat-icon tabindex="0" (click)="close()" (keydown.enter)="close()">close</mat-icon>
    </div>
  `,
  styleUrls: ['notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public showNotification = false;
  public hasBeenDismissed = false;
  public notification: JSON;

  constructor(
    private getNotification: GetNotificationGQL
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getNotification.fetch().pipe(
        map((result) => result.data.homepageCollection.items[0].notification)
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
