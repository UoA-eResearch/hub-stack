import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule, APOLLO_TESTING_CACHE } from 'apollo-angular/testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockInstance, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AppStorageService } from './app-storage.service';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let backend: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        MockProvider(AppStorageService, {
          getItem: (key) => of(1).toPromise(),
          setItem: (key, value) => Promise.resolve()
        }),
        {
          provide: APOLLO_TESTING_CACHE,
          useValue: new InMemoryCache({ addTypename: true }),
        }
      ]
    });
    service = TestBed.inject(NotificationService);
    backend = TestBed.inject(ApolloTestingController);

  });

  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getNotification should return notification text if stored version is different to backend version', fakeAsync( () => {
    const notificationText = 'This is a notification';

    service.getNotification().subscribe((result) => {
      expect(result?.json).toBe(notificationText);
    });

    backend.expectOne('GetNotificationPublishedVersion')
      .flushData({
        homepageCollection: {
          __typename: 'HomepageCollection',
          items: [
            {
              __typename: 'Homepage',
              sys: {
                __typename: 'Sys',
                publishedVersion: 2
              }
            }
          ]
        }
      });

    tick();

    backend.expectOne('GetNotification')
      .flushData({
        homepageCollection: {
          __typename: 'HomepageCollection',
          items: [
            {
              __typename: 'Homepage',
              sys: {
                __typename: 'Sys',
                publishedVersion: 1
              },
              notification: {
                __typename: 'HomepageNotification',
                json: notificationText
              }
            }
          ]
        }
      });
  }));

  it('#getNotification should NOT return notification text if stored version is same as backend version', fakeAsync( () => {
    service.getNotification().subscribe();

    backend.expectOne('GetNotificationPublishedVersion')
      .flushData({
        homepageCollection: {
          __typename: 'HomepageCollection',
          items: [
            {
              __typename: 'Homepage',
              sys: {
                __typename: 'Sys',
                publishedVersion: 1
              }
            }
          ]
        }
      });

    tick();

    backend.expectNone('GetNotification');
  }));

  it('#storeCurrentNotificationVersion should not return a value', async () => {
    service.publishedVersion = 1;
    const value = await service.storeCurrentNotificationVersion();

    expect(value).toBeFalsy();
  });
});
