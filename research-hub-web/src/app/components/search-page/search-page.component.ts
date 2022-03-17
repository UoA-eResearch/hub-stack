import { Component, OnInit } from '@angular/core';
import supportsWebP from 'supports-webp';
import { PageTitleService } from '@services/page-title.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public bannerImageUrl: string = 'https://images.ctfassets.net/vbuxn5csp0ik/dLNmMgxMJVJjdDATTpWZn/433ae5de80f78868c4fb37a256ed2801/1500_UoA_13Oct09_001.jpg';

  constructor(
    public pageTitleService: PageTitleService
  ) {
    this.detectWebP();
  }

  ngOnInit() {
    this.pageTitleService.title = 'Search Results';
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.bannerImageUrl = supported ? this.bannerImageUrl  + '?w=1900&fm=webp' : this.bannerImageUrl + '?w=1900';
    });
  }

  scrollToTop() {
    document?.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
