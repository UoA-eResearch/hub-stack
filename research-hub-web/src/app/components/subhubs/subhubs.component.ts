import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, flatMap } from 'rxjs/operators';
import {
  AllSubHubChildPagesGQL,
  SubHubChildPagesByIdGQL,
  SubHubCollection,
  SubHub
} from "@graphql/schema";
import { CerGraphqlService } from "@services/cer-graphql.service";
import { AppComponentService } from '../../app.component.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';


@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss'],
})
export class SubhubsComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [INLINES.HYPERLINK]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public subhub$: Observable<SubHubCollection>;
  public currentSubHub$: Observable<SubHub>;
  public parentSubHubs;
  public allSubHubs$: Observable<SubHubCollection>;
  public slug: string;

  constructor(
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL,
    public SubHubChildPagesByIdGQL: SubHubChildPagesByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService
  ) { }

  async ngOnInit() {

    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getArticleBySlug() method.
     */
    this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;

    if (!!this.slug) {
      this.subhub$ = this.getSubHub(this.slug);
      this.subhub$.subscribe(data => {
        this.currentSubHub$ = this.getSubHubById(data.items[0].sys.id);
        this.appComponentService.setTitle(data.items[0].title);
      });
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

  /**
   * Get Subhub by passing the slug into the SubhubCollection query
   * @param slug 
   */
  public getSubHub(slug: string): Observable<SubHubCollection> {
    try {
      return this.AllSubHubChildPagesGQL
        .fetch({slug})
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  /**
   * Get Subhub by passing id into the Subhub query
   * @param id 
   */
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
