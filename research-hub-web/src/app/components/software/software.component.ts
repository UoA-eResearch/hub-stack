import { Component, OnInit, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentService } from '@app/app.component.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllSoftwareGQL,
  GetSoftwareBySlugGQL,
  GetSoftwareByIdGQL,
  SoftwareCollection,
  Software,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public software$: Observable<Software>;
  public allSoftware$: Observable<SoftwareCollection>;
  public parentSubHubs;

  constructor(
    public route: ActivatedRoute,
    public allSoftwareGQL: AllSoftwareGQL,
    public getSoftwareBySlugGQL: GetSoftwareBySlugGQL,
    public getSoftwareByIDGQL: GetSoftwareByIdGQL,
    public cerGraphQLService: CerGraphqlService,
    public appComponentService: AppComponentService,
    public bodyMediaService: BodyMediaService,
    public router: Router
  ) { }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getSoftwareBySlug() method.
     */
      this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the software/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual software,
     * therefore run the corresponding query. If not, return all software.
     */
    if (!!this.slug) {
      this.getSoftwareBySlug(this.slug).subscribe(data => {
        this.software$ = this.getSoftwareByID(data.sys.id);
        this.software$.subscribe(res => {
          this.bodyMediaService.setBodyMedia(res.bodyText.links);
        });
        this.appComponentService.setTitle(data.title);
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.appComponentService.setTitle('Software');
      this.allSoftware$ = this.getAllSoftware();
    }
  }

  /**
   * Function that returns all software from the SoftwareCollection as an observable
   * of type SoftwareCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting software/slug-name.
   */
  public getAllSoftware(): Observable<SoftwareCollection> {
    try {
      return this.allSoftwareGQL.fetch()
        .pipe(pluck('data', 'softwareCollection')) as Observable<SoftwareCollection>
    } catch (e) { console.error('Error loading all software:', e) };
  }

  /**
   * Function that returns an individual software from the SoftwareCollection by it's slug
   * as an observable of type Software. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /software.
   *
   * @param slug The software's slug. Retrieved from the route parameter of the same name.
   */
  public getSoftwareBySlug(slug: string): Observable<Software> {
    try {
      return this.getSoftwareBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.softwareCollection.items)) as Observable<Software>;
    } catch (e) { console.error(`Error loading software ${slug}:`, e); }
  }

  /**
   * Function that returns an individual software from the SoftwareCollection by it's ID
   * as an observable of type Software. This is then unwrapped with the async pipe.
   * ID is retrieved by subscribing to 'getSoftwareBySlug'.
   */
  public getSoftwareByID(id: string): Observable<Software> {
    try {
      return this.getSoftwareByIDGQL.fetch({id: id})
        .pipe(map(x => x.data.software)) as Observable<Software>;
    } catch (e) { console.error(`Error loading software ${id}:`, e); }
  }
}

