import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
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

  public isMobile: Boolean;
  public aucklandUniUrl = 'https://auckland.ac.nz';

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.detectDevice();
    this.detectWebP();
  }

  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.bannerImageUrl = supported ? this.bannerImageUrl + '?fm=webp' : this.bannerImageUrl;
      this.logoImageUrl = supported ? this.logoImageUrl + '?fm=webp' : this.logoImageUrl;
    });
  }
}
