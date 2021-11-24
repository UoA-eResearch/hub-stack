import { Component, Input, OnInit } from '@angular/core';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent {
  @Input() bannerImageUrl: string;
  @Input() logoImageUrl: string;
  @Input() title: string;

  public aucklandUniUrl = 'https://auckland.ac.nz';

  constructor(
  ) {
    this.detectWebP();
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.bannerImageUrl = supported ? this.bannerImageUrl + '?w=1900&fm=webp' : this.bannerImageUrl + '?w=1900';
      this.logoImageUrl = supported ? this.logoImageUrl + '?fm=webp' : this.logoImageUrl;
    });
  }
}
