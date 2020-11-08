import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, flatMap } from 'rxjs/operators';
import {
  AllSubHubChildPagesGQL,
  SubHubCollection,
  SubHub
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';


@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss'],
})
export class SubhubsComponent implements OnInit {

  public subhub$: Observable<SubHubCollection>;
  public parentSubHubs;
  public allSubHubs$: Observable<SubHubCollection>;
  public slug: string;

  constructor(
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL,
    public cerGraphQLService: CerGraphqlService
  ) { }

  async ngOnInit() {
    this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;

    // this.route.params.subscribe((params) => {
    //   this.slug = params['slug'];
    // });

    if (!!this.slug) {
      this.subhub$ = this.getSubHub(this.slug);
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.allSubHubs$ = this.getAllSubHubs(this.slug);
    }
  }

  /**
   * Runs the query for the main body of a subhub item as including it's child pages but excluding it's ancestor/parent data.
   * @param slug Page slug
   */
  public getAllSubHubs(slug: string): Observable<SubHubCollection> {
    try {
      return this.AllSubHubChildPagesGQL
        .fetch()
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  public getSubHub(slug: string): Observable<SubHubCollection> {
    try {
      return this.AllSubHubChildPagesGQL.fetch({
        slug
      }).pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

}
