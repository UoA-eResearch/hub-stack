import { Component, OnInit } from '@angular/core';
import { AllSearchableContentPublicFieldsGQL, AllSearchableContentPublicFieldsQuery } from '@graphql/schema';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AppComponentService } from '../../app.component.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  public allSearchableContent$: Observable<AllSearchableContentPublicFieldsQuery>;

  constructor(
    public allSearchableContentPublicFieldsGQL: AllSearchableContentPublicFieldsGQL,
    public appComponentService: AppComponentService) { }

  ngOnInit(): void {
    this.appComponentService.setTitle('All');
    try {
      this.allSearchableContent$ = this.getAllSearchableContent();
    } catch (e) { console.error('Error loading all content:', e); }
  }

  /**
   * Iterates through all the collections and returns the total number of content items.
   */
  public allContentLength(collectionCollection): number {
    let count = 0;
    for (const collection of Object.keys(collectionCollection)) {
      count += collectionCollection[collection].items.length;
    }
    return count;
  }

  /**
   * A wrapper function that returns all collections of all searchable content types.
   */
  public getAllSearchableContent() {
    return this.allSearchableContentPublicFieldsGQL.fetch().pipe(pluck('data'));
  }

}
