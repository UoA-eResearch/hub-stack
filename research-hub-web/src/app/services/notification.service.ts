import { Injectable } from '@angular/core';
import { GetNotificationGQL, GetNotificationPublishedVersionGQL } from '@app/graphql/schema';
import { from, iif, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppStorageService } from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public readonly NOTIFICATION_STORAGE_KEY = 'notification/publishedVersion';
  public publishedVersion?: number | null;

  constructor(
    private storageService: AppStorageService,
    private getNotificationGQL: GetNotificationGQL,
    private getNotificationPublishedVersionGQL: GetNotificationPublishedVersionGQL
  ) { }

  /**
   * Checks if `publishedVersion` is equal to version stored in local storage.
   * @param publishedVersion version number to compare against
   * @returns An observable that emits true if the version numbers are equal.
   */
  private equalsStoredValue(publishedVersion?: number | null): Observable<boolean> {
    return from(this.storageService.getItem(this.NOTIFICATION_STORAGE_KEY))
      .pipe(
        map((storedVersion) => publishedVersion === parseInt(storedVersion))
      );
  }

  /**
   * GraphQL query for the current version of the notification in Contentful.
   * @returns An observable that emits the current version of the notification.
   */
  private getNotificationPublishedVersion() {
    return this.getNotificationPublishedVersionGQL
      .fetch()
      .pipe(
        map((result) => result.data.homepageCollection?.items[0]?.sys.publishedVersion)
      );
  }

  /**
   * GraphQL query for the notification itself. Stores `publishedVersion` value of fetched notification in public field.
   * @returns An observable that emits the current notification if the notification is not null.
   */
  private getNotificationData() {
    return this.getNotificationGQL
      .fetch()
      .pipe(
        tap((result) => this.publishedVersion = result.data.homepageCollection?.items[0]?.sys.publishedVersion),
        map((result) => result.data.homepageCollection?.items[0]?.notification),
        filter((result) => result !== null),
      );
  }

  /**
   * Request the notification. Checks the currently stored version number and decides whether to emit the notification or nothing.
   * @returns An observable that emits the notification if the `publishedVersion` is not equal to the value stored in local storage or an `EMPTY` observable.
   */
  public getNotification() {
    return this.getNotificationPublishedVersion()
      .pipe(
        mergeMap((result) => this.equalsStoredValue(result)),
        // if isEqual is true iif() returns EMPTY
        // if isEqual is false iif() return this.getNotificationData()
        switchMap((isEqual) => iif(
          () => !isEqual,
          this.getNotificationData()
        ))
      );
  }

  /**
   * Store the current value of the notification in local storage
   * @returns A promise of void
   */
  public storeCurrentNotificationVersion(): Promise<void> {
    return this.storageService.setItem(
      this.NOTIFICATION_STORAGE_KEY,
      this.publishedVersion
    )
  }
}
