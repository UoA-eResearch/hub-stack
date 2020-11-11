import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from "rxjs";
import { pluck, map, flatMap } from "rxjs/operators";
import {
  AllSubHubChildPagesGQL,
  SubHubChildPagesByIdGQL,
  SubHubCollection,
  SubHub
} from "@graphql/schema";
import { CerGraphqlService } from "@services/cer-graphql.service";
import { AppComponentService } from '../../app.component.service';


@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss'],
})
export class SubhubsComponent implements OnInit {

  public subhub$: Observable<SubHubCollection>;
  public currentSubHub$: Observable<SubHub>;
  public parentSubHubs;
  public allSubHubs$: Observable<SubHubCollection>;
  public slug: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL,
    public SubHubChildPagesByIdGQL: SubHubChildPagesByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService
  ) { }

  internalNavigate(path) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([path]);
  }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      this.slug ? this.internalNavigate('/subhub/' + this.slug) : this.internalNavigate('/subhubs');
    });

    if (!!this.slug) {
      this.subhub$ = this.getSubHub(this.slug);
      this.subhub$.subscribe(data => {
        this.currentSubHub$ = this.getSubHubById(data.items[0].sys.id);
        this.appComponentService.setTitle(data.items[0].title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('SubHubs');
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
        .pipe(pluck("data", "subHubCollection")) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  public getSubHub(slug: string): Observable<SubHubCollection> {
    try {
      return this.AllSubHubChildPagesGQL
        .fetch({slug})
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  public getSubHubById(id: string): Observable<SubHub> {
    try {
      return this.SubHubChildPagesByIdGQL
        .fetch({id: id})
        .pipe(pluck('data', 'subHub')) as Observable<SubHub>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

}
