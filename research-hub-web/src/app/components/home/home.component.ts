import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { HomeScrollService } from '@services/home-scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('featured') featured: QueryList<ElementRef>;
  @ViewChild('categories') categories: QueryList<ElementRef>;
  @ViewChild('activities') activities: QueryList<ElementRef>;

  /**
   * Contact Section
   */
  public title = "Contact";
  public description = "If you want to get in touch you can ring us, write to us or even visit us. We'd love to hear from you.";
  public feedbackLink = "https://docs.google.com/forms/d/e/1FAIpQLSdxSyxLBBzexHDgPmjoAukxDzDo3fRHfKi4TmqFHYxa0dB37g/viewform";
  public email = "eresearch-support@auckland.ac.nz";
  public phone = "+64 9 373 7599 ext 82231";

  constructor(public homeScrollService: HomeScrollService) {
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.homeScrollService.setFeatured(this.featured['nativeElement']);
    this.homeScrollService.setCategories(this.categories['nativeElement']);
    this.homeScrollService.setActivities(this.activities['nativeElement']);
  }
}
