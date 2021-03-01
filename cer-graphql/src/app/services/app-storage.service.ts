import { Injectable } from '@angular/core';

import { StorageService } from '@uoa/auth';
import * as localforage from 'localforage';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService implements StorageService {

    getItem(key: string): Promise<any> {
        return localforage.getItem(key);
    }

    setItem(key: string, val: any): void {
        localforage.setItem(key, val);
    }

    removeItem(key: string): void {
        localforage.removeItem(key);
    }
}
