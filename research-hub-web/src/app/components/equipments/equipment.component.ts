import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyMediaComponent } from '@components/shared/body-media/body-media.component';
import { BlocksQuoteComponent } from '@components/shared/body-media/blocks-quote/blocks-quote.component';
import { BlocksEmbeddedAssetComponent } from '@components/shared/body-media/blocks-embedded-asset/blocks-embedded-asset.component';
import { BlocksEmbeddedEntryComponent } from '@components/shared/body-media/blocks-embedded-entry/blocks-embedded-entry.component';
import { InlinesAssetHyperlinkComponent } from '@components/shared/body-media/inlines-asset-hyperlink/inlines-asset-hyperlink.component';
import { InlinesEmbeddedEntryComponent } from '@components/shared/body-media/inlines-embedded-entry/inlines-embedded-entry.component';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import {
  AllEquipmentGQL,
  AllEquipmentSlugsGQL,
  Equipment,
  EquipmentCollection,
  GetEquipmentBySlugGQL
} from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { CerGraphqlService } from '@services/cer-graphql.service';
import { PageTitleService } from '@services/page-title.service';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  nodeRenderers: Record<string, Type<NodeRenderer>> = {
    [BLOCKS.QUOTE]: BlocksQuoteComponent,
    [BLOCKS.EMBEDDED_ASSET]: BlocksEmbeddedAssetComponent,
    [BLOCKS.EMBEDDED_ENTRY]: BlocksEmbeddedEntryComponent,
    [INLINES.ASSET_HYPERLINK]: InlinesAssetHyperlinkComponent,
    [INLINES.EMBEDDED_ENTRY]: InlinesEmbeddedEntryComponent,
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
        if (!slugs.includes(this.slug)) { this.router.navigate(['error/404']) }
      });
      this.equipment = this.getEquipmentBySlug(this.slug);
      this.equipment$ = this.getEquipmentBySlug(this.slug).subscribe(data => {
        // Strip nulls from related collection data.
        data.relatedContactsCollection.items = data.relatedContactsCollection.items.filter(item => item);
        data.relatedDocsCollection.items = data.relatedDocsCollection.items.filter(item => item);
        data.relatedItemsCollection.items = data.relatedItemsCollection.items.filter(item => item);
        data.relatedOrgsCollection.items = data.relatedOrgsCollection.items.filter(item => item);

        // If Call To Action is an email address
        if (data.callToAction?.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          data['callToAction'] = 'mailto:' + data['callToAction'];
        }

        // Set banner image URL for webp format if webp is supported
        if (data.banner?.url) {
          this.bannerImageUrl = this.supportsWebp ? data.banner?.url + '?w=1900&fm=webp' : data.banner?.url + '?w=1900';
        } else {
          this.bannerImageUrl = undefined;
        }

        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText.links);
        
        this.pageTitleService.title = data.title;
      });
      this.parentSubHubs = await this.cerGraphQLService.getParentSubHubs(this.slug);
    } else {
      this.pageTitleService.title = 'Equipment';
      this.allEquipment$ = this.getAllEquipment();
      try { this.equipment$.unsubscribe(); } catch { }
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
    } catch { }
  }
}
