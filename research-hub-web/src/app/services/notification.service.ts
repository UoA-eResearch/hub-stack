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
    private getNotificationPublishedVersion: GetNotificationPublishedVersionGQL
  ) { }

  private $equalsStoredValue = (publishedVersion?: number | null): Observable<boolean> =>
    from(this.storageService.getItem(this.NOTIFICATION_STORAGE_KEY)).pipe(
      map((storedVersion) => publishedVersion === parseInt(storedVersion))
    );


  private $getNotificationPublishedVersion = this.getNotificationPublishedVersion.fetch().pipe(
    map((result) => result.data.homepageCollection?.items[0]?.sys.publishedVersion)
  );

  private getNotificationData =
    this.getNotificationGQL.fetch().pipe(
      tap((result) => this.publishedVersion = result.data.homepageCollection?.items[0]?.sys.publishedVersion),
      map((result) => result.data.homepageCollection?.items[0]?.notification),
      filter((result) => result !== null),
    );

  public getNotification =
    this.$getNotificationPublishedVersion.pipe(
      mergeMap((result) => this.$equalsStoredValue(result)),
      switchMap((isEqual) => iif(
        () => !isEqual,
        this.getNotificationData
      ))
    );



}
