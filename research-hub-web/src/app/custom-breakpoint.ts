import { BREAKPOINT } from '@angular/flex-layout';

const MY_BREAKPOINTS = [
  { alias: 'xs', mediaQuery: 'screen and (max-width: 96vh)'},
  { alias: 'sm', mediaQuery: 'screen and (min-width: 96.1vh) and (max-width: 124vh)'},
  { alias: 'md', mediaQuery: 'screen and (min-width: 124.1vh) and (max-width: 150vh)'},
  { alias: 'lg', mediaQuery: 'screen and (min-width: 150.1vh) and (max-width: 240vh)'},
  { alias: 'xl', mediaQuery: 'screen and (min-width: 240.1vh) and (max-width: 625vh)'},

  { alias: 'lt-sm', mediaQuery: 'screen and (max-width: 96vh)'},
  { alias: 'lt-md', mediaQuery: 'screen and (max-width: 124vh)'},
  { alias: 'lt-lg', mediaQuery: 'screen and (max-width: 150vh)'},
  { alias: 'lt-xl', mediaQuery: 'screen and (max-width: 240vh)'},

  { alias: 'gt-xs', mediaQuery: 'screen and (min-width: 96vh)'},
  { alias: 'gt-sm', mediaQuery: 'screen and (min-width: 124vh'},
  { alias: 'gt-md', mediaQuery: 'screen and (min-width: 150vh)'},
  { alias: 'gt-lg', mediaQuery: 'screen and (min-width: 240vh)'},
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: MY_BREAKPOINTS,
  multi: true
};