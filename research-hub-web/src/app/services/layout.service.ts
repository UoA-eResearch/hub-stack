import {Injectable} from '@angular/core';

// fxFlex breakpoint min widths
// https://github.com/angular/flex-layout/wiki/Responsive-API
export const MQ_ALIASES = {
  'sm': 600,
  'md': 960,
  'lg': 1280,
  'xl': 1920
};
@Injectable()
export class LayoutService {

  constructor() {

  }

  public getNumGridCols(mqAlias: string) {
    let numCols = 0;
    switch (mqAlias) {
      case 'xs':
        numCols = 2;
        break;
      case 'sm':
        numCols = 2;
        break;
      case 'md':
        numCols = 3;
        break;
      case 'lg':
        numCols = 4;
        break;
      case 'xl':
        numCols = 4;
        break;
      default:
        numCols = 4;
        break;
    }

    return numCols;
  }

  public getMQAlias(): string {
    const width = window.innerWidth;
    if ( width < MQ_ALIASES.sm) {
      return 'xs';
    } else if (width >= MQ_ALIASES.sm && width < MQ_ALIASES.md) {
      return 'sm';
    } else if (width >= MQ_ALIASES.md && width < MQ_ALIASES.lg) {
      return 'md';
    } else if (width >= MQ_ALIASES.lg && width < MQ_ALIASES.xl) {
      return 'lg';
    } else if (width >= MQ_ALIASES.xl) {
      return 'xl';
    }
  }

  public isWidthLessThan(mqAlias:string):boolean {
    const aliasWidth = MQ_ALIASES[mqAlias];
    if (!aliasWidth) {
      return false;
    }
    return window.innerWidth < aliasWidth;
  }

  /**
   * Layout method for card view search results
   * Requires different number of columns to above getNumGridCols() method
   */
  public getNumGridColsCardResults(mqAlias: string) {
    let numCols = 0;
    switch (mqAlias) {
      case 'xs':
        numCols = 1;
        break;
      case 'sm':
        numCols = 2;
        break;
      case 'md':
        numCols = 3;
        break;
      case 'lg':
        numCols = 3;
        break;
      case 'xl':
        numCols = 3;
        break;
      default:
        numCols = 3;
        break;
    }

    return numCols;
  }

}
