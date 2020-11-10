import { ElementRef } from '@angular/core';
import { AssetDirective } from './asset.directive';

describe('AssetDirective', () => {
  it('should create an instance', () => {
    let element: ElementRef<any>;
    const directive = new AssetDirective(element);
    expect(directive).toBeTruthy();
  });
});
