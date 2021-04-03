import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeScrollService {
  public featured: HTMLElement;
  public categories: HTMLElement;
  public activities: HTMLElement;

  constructor() { }

  // Featured
  getFeatured() {
    return this.featured;
  }
  setFeatured(featured) {
      this.featured = featured;
  }

  // Categories
  getCategories() {
    return this.categories;
  }
  setCategories(categories) {
      this.categories = categories;
  }

  // Activities
  getActivities() {
    return this.activities;
  }
  setActivities(activities) {
      this.activities = activities;
  }

  scrollTo(section) {
    switch(section) {
      case 'Categories':
        this.categories.scrollIntoView({behavior: 'smooth'});
        break;
      case 'Activities':
        this.activities.scrollIntoView({behavior: 'smooth'});
        break;
      case 'Featured':
        this.featured.scrollIntoView({behavior: 'smooth'});
        break;
    }
  }
}
