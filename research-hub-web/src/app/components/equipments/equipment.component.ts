import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, flatMap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '@services/page-title.service';
import { BodyMediaService } from '@services/body-media.service';
import {
  AllEquipmentGQL,
  AllEquipmentSlugsGQL,
  GetEquipmentBySlugGQL,
  EquipmentCollection,
  Equipment,
} from '@graphql/schema';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ASSET]: BodyMediaComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ASSET_HYPERLINK]: BodyMediaComponent,
    [INLINES.EMBEDDED_ENTRY]: BodyMediaComponent,
    [INLINES.ENTRY_HYPERLINK]: BodyMediaComponent,
  };

  public slug: string;
  public equipment;
  public equipment$: Subscription;
  public route$: Subscription;
  public bodyLinks$: Subscription;
  public allEquipment$: Observable<EquipmentCollection>;
  public parentSubHubs;
  public isMobile: Boolean;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public allEquipmentGQL: AllEquipmentGQL,
    public allEquipmentSlugsGQL: AllEquipmentSlugsGQL,
    public getEquipmentBySlugGQL: GetEquipmentBySlugGQL,
    public cerGraphQLService: CerGraphqlService,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
    private deviceService: DeviceDetectorService,
    public location: Location
  ) {
    this.detectDevice();
    this.detectWebP();
  }

  // Detect if device is Mobile
  detectDevice() {
    this.isMobile = this.deviceService.isMobile();
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  async ngOnInit() {
    /**
     * Check if there is a slug URL parameter present. If so, this is
     * passed to the getEquipmentBySlug() method.
     */
      this.route$ = this.route.params.subscribe(params => {
        this.slug = params.slug || this.route.snapshot.data.slug;
        this._loadContent();
      });
  }

  /**
   * Function that loads the Equipment/collection depending on if a slug is present.
   */
  private async _loadContent() {
    /**
     * If this.slug is defined, we're loading an individual Equipment,
     * therefore run the corresponding query. If not, return all Equipment.
     */
    if (!!this.slug) {
      // Check if the equipment slug is valid otherwise redirect to 404
      this.getAllEquipmentSlugs().subscribe(data => {
        let slugs = [];
          data.items.forEach(data => {
            slugs.push(data.slug)
          })
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404'])}
      });
      this.equipment = this.getEquipmentBySlug(this.slug);
      this.equipment$ = this.getEquipmentBySlug(this.slug).subscribe(data => {
        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        }

        this.bodyMediaService.setBodyMedia(data.bodyText?.links);
        this.pageTitleService.title = data.title;
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'Equipment';
      this.allEquipment$ = this.getAllEquipment();
      try { this.equipment$.unsubscribe(); } catch {}
    }
  }

  /**
   * Function that returns all Equipment from the EquipmentCollection as an observable
   * of type EquipmentCollection. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e. the
   * user is visiting Equipment/slug-name.
   */
  public getAllEquipment(): Observable<EquipmentCollection> {
    try {
      return this.allEquipmentGQL.fetch()
        .pipe(pluck('data', 'equipmentCollection')) as Observable<EquipmentCollection>
    } catch (e) { console.error('Error loading all Equipment:', e) };
  }

  /**
   * Function that returns all equipment slugs from the EquipmentCollection as an observable
   * of type EquipmentCollection. This is then unwrapped with the async pipe.
   *
   * This function called to determine if a valid slug has been searched otherwise redirect
   *
   */
  public getAllEquipmentSlugs(): Observable<EquipmentCollection> {
    try {
      return this.allEquipmentSlugsGQL.fetch()
        .pipe(pluck('data', 'equipmentCollection')) as Observable<EquipmentCollection>
    } catch (e) { console.error('Error loading all equipment', e) };
  }

  /**
   * Function that returns an individual Equipment from the EquipmentCollection by it's slug
   * as an observable of type Equipment. This is then unwrapped with the async pipe.
   *
   * This function is only called if no slug parameter is present in the URL, i.e.
   * the user is visiting /Equipment.
   *
   * @param slug The Equipment's slug. Retrieved from the route parameter of the same name.
   */
  public getEquipmentBySlug(slug: string): Observable<Equipment> {
    try {
      return this.getEquipmentBySlugGQL.fetch({ slug: this.slug })
        .pipe(flatMap(x => x.data.equipmentCollection.items)) as Observable<Equipment>;
    } catch (e) { console.error(`Error loading equipment ${slug}:`, e); }
  }

  ngOnDestroy() {
    try {
      this.equipment$.unsubscribe();
      this.route$.unsubscribe();
      this.bodyLinks$.unsubscribe();
    } catch {}
  }
}
