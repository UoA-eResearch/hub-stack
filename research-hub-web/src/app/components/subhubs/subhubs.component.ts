import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, map, flatMap, tap } from 'rxjs/operators';
import {
  AllSubHubGQL,
  GetSubHubByIdGQL,
  GetSubHubBySlugGQL,
  SubHubCollection,
  SubHub
} from "@graphql/schema";
import { CerGraphqlService } from "@services/cer-graphql.service";
import { AppComponentService } from '../../app.component.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BodyMediaService } from '@services/body-media.service';


@Component({
  selector: 'app-subhubs',
  templateUrl: './subhubs.component.html',
  styleUrls: ['./subhubs.component.scss'],
})
export class SubhubsComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
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
    public AllSubHubGQL: AllSubHubGQL,
    public GetSubHubBySlug: GetSubHubBySlugGQL,
    public GetSubHubById: GetSubHubByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router
  ) { }

  async ngOnInit() {

    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getArticleBySlug() method.
     */
    this.slug = this.route.snapshot.params.slug || this.route.snapshot.data.slug;

    if (!!this.slug) {
      this.getSubHubBySlug(this.slug).subscribe(data => {
        this.currentSubHub$ = this.getSubHubById(data.sys.id);
        this.currentSubHub$.subscribe(res => {
          this.appComponentService.setTitle(res.title);
          this.bodyMediaService.setBodyMedia(res.bodyText.links);}
          );
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
  public getAllSubHubs(): Observable<SubHubCollection> {
    try {
      return this.AllSubHubGQL.fetch()
        .pipe(pluck('data', 'subHubCollection')) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  /**
   * Get Subhub by passing the slug into the SubhubCollection query
   * @param slug 
   */
  public getSubHubBySlug(slug: string): Observable<SubHub> {
    try {
      return this.GetSubHubBySlug.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.subHubCollection.items)) as Observable<SubHub>;
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
      return this.GetSubHubById.fetch({id: id})
      .pipe(map(x => x.data.subHub)) as Observable<SubHub>;
    } catch (e) { console.error(`Error loading subhub ${id}:`, e); }
  }
}
