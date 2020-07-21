import { Component, OnInit } from '@angular/core';
import { AllSubHubChildPagesGQL, AllSubHubChildPagesQuery } from '../../graphql/schema';
import  { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss']
})
export class SubhubsComponent implements OnInit {

  public allSubHubChildPages$: Observable<AllSubHubChildPagesQuery['subHubCollection']>;

  constructor(public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL) { }

  ngOnInit(): void {
    this.allSubHubChildPages$ = this.AllSubHubChildPagesGQL.fetch().pipe(pluck('data', 'subHubCollection'));
  }

}
