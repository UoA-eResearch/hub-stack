import { Injectable } from '@angular/core';
import { StorageService } from '@uoa/auth';
import * as localforage from 'localforage';


@Injectable({
  providedIn: 'root',
})
export class AppStorageService implements StorageService {

  constructor() {
    /**
     * Supplying a list of drivers, in order of preference
     */
    localforage.setDriver([localforage.LOCALSTORAGE, localforage.INDEXEDDB, localforage.WEBSQL]);
  }

  getItem(key: string): Promise<any> {
    return localforage.getItem(key);
  }

  setItem(key: string, val: any): Promise<void> {
    return localforage.setItem(key, val);
  }

  removeItem(key: string): void {
    localforage.removeItem(key);
  }
}
