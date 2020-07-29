import { Component, OnInit } from '@angular/core';
import { AllSearchableContentPublicFieldsGQL, AllSearchableContentPublicFieldsQuery } from '../../graphql/schema';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  public allSearchableContent$: Observable<AllSearchableContentPublicFieldsQuery>;

  constructor(public allSearchableContentPublicFieldsGQL: AllSearchableContentPublicFieldsGQL) { }

  ngOnInit(): void {
    try {
      this.allSearchableContent$ = this.allSearchableContentPublicFieldsGQL.fetch().pipe(pluck('data'));
    } catch (e) { console.error('Error loading all content:', e); }
  }

}
