import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAsset]'
})
export class AssetDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
 }
}
