import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public title = 'Featured Topics';
  public description = "The thing you learn about learning is that there's always more to learn! Here are the highlights of what we are all learning together in the research community at the University of Auckland.";

  constructor() { }

  ngOnInit(): void {
  }

}
