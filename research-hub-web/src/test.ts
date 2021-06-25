// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { ngMocks } from 'ng-mocks';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Subject } from 'rxjs';

// ng-mocks
ngMocks.autoSpy('jasmine');

// default mock return values for SearchBarService
ngMocks.defaultMock(SearchBarService, () => ({
  /**
   * this is just to get the test to run. EMPTY doesn't work for some reason
   * check https://ng-mocks.sudo.eu/extra/mock-observables
   */
  searchCategoryChange: new Subject<any>(),
  searchTextChange: new Subject<any>(),
  totalPagesChange: new Subject<any>()
}));

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
