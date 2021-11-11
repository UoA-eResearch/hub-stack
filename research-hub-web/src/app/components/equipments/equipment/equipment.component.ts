import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment, GetEquipmentBySlugGQL } from '@graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { PageTitleService } from '@services/page-title.service';
import { MarkRenderer, NodeRenderer } from 'ngx-contentful-rich-text';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import supportsWebP from 'supports-webp';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  private subscriptions = new Subscription();

  public equipment: Equipment;
  public isMobile: Boolean;
  public supportsWebp: Boolean;
  public bannerImageUrl: string;

  constructor(
    public route: ActivatedRoute,
    public getEquipmentBySlugGQL: GetEquipmentBySlugGQL,
    public pageTitleService: PageTitleService,
    public bodyMediaService: BodyMediaService,
    public router: Router,
  ) {
    this.detectWebP();

    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
  }

  detectWebP() {
    supportsWebP.then(supported => {
      this.supportsWebp = supported;
    });
  }

  ngOnInit() {
    this.subscriptions.add(this.route.params.pipe(
      map((params) => {
        return (params.slug || this.route.snapshot.data.slug) as string;
      }),
      switchMap((slug) => this.loadEquipment(slug))
    ).subscribe({
      next: (equipment: Equipment) => this.equipment = equipment,
      error: (error) => {
        console.error(error);
        this.router.navigate(['error', 404]);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadEquipment(slug: string): Observable<Equipment> {
    return this.getEquipmentBySlug(slug).pipe(
      map((data) => {
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
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);

        this.pageTitleService.title = data.title;

        return data;
      })
    );
  }

  /**
   * Function that returns an individual article from the ArticleCollection by it's slug
   * as an observable of type Article.
   *
   * @param slug The article's slug. Retrieved from the route parameter of the same name.
   */
  public getEquipmentBySlug(slug: string): Observable<Equipment> {
    return this.getEquipmentBySlugGQL.fetch({ slug }).pipe(
      mergeMap(x =>
        x.data.equipmentCollection.items.length === 0
          ? throwError(`Could not load equipment with slug "${slug}"`)
          : of(x.data.equipmentCollection.items[0])
      )
    ) as Observable<Equipment>;
  }
}
