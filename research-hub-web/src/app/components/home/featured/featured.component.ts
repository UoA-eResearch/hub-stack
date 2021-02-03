import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  slides = ["one", "two", "three", "four", "five"];
  constructor() { }

  ngOnInit(): void {
  }

}
