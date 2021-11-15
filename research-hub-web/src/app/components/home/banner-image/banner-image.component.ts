import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {

  @Input() bannerImageUrl: string;
  @Input() logoImageUrl: string;
  @Input() title: string;

  public isMobile: Boolean;
  public supportsWebp: Boolean;

  //public title = "Find Services, Resources and People to accelerate your research";
  public aucklandUniUrl = 'https://auckland.ac.nz';

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.detectDevice();
    this.detectWebP();
  }

  ngOnInit(): void {
    this.bannerImageUrl = this.supportsWebp ? this.bannerImageUrl + '?fm=webp' : this.bannerImageUrl;
    this.logoImageUrl = this.supportsWebp ? this.logoImageUrl + '?fm=webp' : this.logoImageUrl;
  }

  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
    console.log(this.isMobile)
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }
}
