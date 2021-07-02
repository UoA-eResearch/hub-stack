import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNotificationGQL } from '@app/graphql/schema';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="showNotification" class="notification-bar-container" fxLayout="row">
      <div class="notification-bar-content">
        <div [innerHTML]="this.notification | richTextToHTML"></div>
      </div>
      <mat-icon (click)="showNotification = false">close</mat-icon>
    </div>
  `,
  styleUrls: ['notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {
  private notificationQuery$: Subscription;

  public showNotification = false;
  public notification: JSON;

  constructor(
    private getNotification: GetNotificationGQL
  ) { }

  ngOnInit(): void {
    this.notificationQuery$ = this.getNotification.fetch().pipe(
      map((result) => result.data.homepageCollection.items[0].notification)
    ).subscribe((result) => {
      this.notification = result.json;
      this.showNotification = true;
    });

  }

  ngOnDestroy(): void {
    this.notificationQuery$?.unsubscribe();
  }

}
