import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { GetAllSubHubChildPagesSlugsGQL } from '@graphql/schema';
import { map } from 'rxjs/operators';

/**
 * The interface of the breadcrumbsArray object returned by this service's getParentSubHubs()
 * method. It contains an array of SubHubs, with their title and slug.
 */
export interface SubHubTitleAndSlug {
  title: String,
  slug: String
};

@Injectable({
  providedIn: 'root'
})
export class CerGraphqlService {

  private _subHubCollectionWithChildPagesSlugs;
  private _subHubMap: SubHubMap = new SubHubMap();

  constructor(
    public getAllSubHubChildPagesSlugs: GetAllSubHubChildPagesSlugsGQL,
    public location: Location,
    public router: Router
  ) { }

  /**
   * Dynamically pushes the SubHubs and the SubHub child pages to the application's routing array
   */
  public async pushSubHubRoutes(): Promise<void> {
    const routes = this.router.config;
    await this._generateSubHubMapAndRoutes(); // Generate _subHubMap.map and _subHubMap.routes
    this._subHubMap.routes.forEach(route => { routes.push(route); }); // Push the new routes to the application's routes.
    this.router.resetConfig(routes);
  }

  /**
   * This function first executes the GraphQL query to load all SubHubs and their child page's slugs, if it hasn't already been
   * loaded. This populates the private member _subHubCollectionWithChildPagesSlugs.
   *
   * Once that is loaded, it generates the _subHubMap SubHub object.
   * Once that object is created, it calls _subHubMap's populateRouteArray() method, which populates its routes member.
   */
  private async _generateSubHubMapAndRoutes() {
    if (!this._subHubCollectionWithChildPagesSlugs) { this._subHubCollectionWithChildPagesSlugs = await this._loadSubHubCollection(); }

    this._subHubCollectionWithChildPagesSlugs // Load the SiteMap
      .forEach(subHub => this._subHubMap.addSubHub(subHub));

    Object.keys(this._subHubMap.map) // Populate _siteMap.routes
      .forEach(rootSubHub => this._subHubMap.populateRouteArray(this._subHubMap.map[rootSubHub]));
  }

  /**
   * Returns the results of the query response's .data.subHubCollection.items array
   */
  private _loadSubHubCollection() {
    return this.getAllSubHubChildPagesSlugs.fetch().toPromise().then(x => x.data.subHubCollection.items);
  }

  /**
   * If it's not already loaded, load the SubHub collection, including the child pages slugs
   * Then call the recursive breadcrumb array builder and return the result.
   *
   * @param entrySlug The slug of the content item we are searching for breadcrumbs for
   */
  public async getParentSubHubs(entrySlug: string) {
    try {
      if (!this._subHubCollectionWithChildPagesSlugs) {
        this._subHubCollectionWithChildPagesSlugs = await this._loadSubHubCollection();
      }
      const breadCrumbsArray: SubHubTitleAndSlug[] = []; // The array to be populated by the recursive function
      this._getBreadCrumbsArray(entrySlug, breadCrumbsArray); // Populate the breadcrumbs array

      // If the current item belongs to a SubHub
      if (breadCrumbsArray.length) {
        const locPath = breadCrumbsArray.map(x => x.slug).reverse().join('/') + '/' + entrySlug;
        this.location.replaceState(locPath); // Update the current location
      }

      return breadCrumbsArray;
    } catch (e) { throw new Error('Error loading breadcrumbs') }
  }

  /**
   * This function recursively searches through the _subHubCollectionWithChildPagesSlugs object for
   * a content item's slug. If found, we know this item belongs to a subhub, so it is added to the
   * breadcrumbsArray parameter, then the function is called recursively on the parent SubHub (and so on).
   * When it is finished, the breadcrumbsArray contains an array of (in order) parent SubHub items.
   *
   * @param entrySlug The slug of the content item we are searching for breadcrumbs for
   * @param breadcrumbsArray The array that will be populated by this function with any parent items
   */
  private _getBreadCrumbsArray(entrySlug: string, breadcrumbsArray) {
    for (const item of this._subHubCollectionWithChildPagesSlugs) {
      item.internalPagesCollection.items.forEach(subPage => {
        if (subPage.slug === entrySlug) { // The SubHub's childPages contains the current entry we're searching for
          for (const subHub of breadcrumbsArray) { // Check it's not already known
            if (subHub.slug === item.slug) {
              throw new Error('Circular SubHub structure detected');
            }
          };
          breadcrumbsArray.push({ title: item.title, slug: item.slug }); // Push it to the breadcrumbsArray
          return this._getBreadCrumbsArray(item.slug, breadcrumbsArray); // Call the function on the SubHub
        }
      });
    }
  }

  /**
   * Loops through the subHubCollectionWithChildPagesSlugs object, finds the containing SubHub.
   * Once it finds the correct SubHub, it loops through the SubHubs items, and finds the child page with the correct
   * slug and returns its Contentful content type.
   *
   * @param subHubSlug the SubHub containing the content item we are searched for
   * @param contentItemSlug the slug of the content item we are searching for
   */
  public getContentType(subHubSlug: string, contentItemSlug: string) {
    return this._subHubCollectionWithChildPagesSlugs
      .filter(x => x.slug === subHubSlug)[0].internalPagesCollection.items
      .filter(y => y.slug === contentItemSlug)[0].__typename;
  }
}

/* ------------------------------------------------------
  The functions and helper classes/interfaces below are
  used to generate the SubHub map and dynamic routing
------------------------------------------------------ */

/**
 * This interface is used to type the results of a subset of the GetAllSubHubChildPagesSlugsGQL
 * query results.
 */
export interface SubHubFromQuery {
  slug: string,
  title: string,
  __typename,
  internalPagesCollection: {
    items: [{
      slug: string,
      __typename: string
    }],
  },
}
/**
 * A class representing any Content item in Contentful, including SubHubs.
 * The SubHubMap.map contains an arbitrary number of these.
 * The class also includes a few accessor methods for getting its child keys etc.
 */
export class Content {
  constructor(
    public slug?: string,
    public typeName?: string
  ) { }

  public get ChildKeys(): string[] { return Object.keys(this).filter(key => key !== 'slug' && key !== 'typeName') }
  public get ChildSubHubKeys(): string[] { return this.ChildKeys.filter(key => this[key].isChildHub()) }
  public isSubHub(): boolean { return this.typeName === 'SubHub' }
}

/**
 * The root SubHubMap.map type, contains an arbitrary number of root-level SubHubs.
 */
export interface ContentMap {
  [property: string]: Content
}

class SubHubMap {
  public map: ContentMap = {};
  public routes: Routes = [];

  /**
   * This function recursively searches through all SubHubs in SubHubMap.map for another
   * SubHub with a given slug. It returns either the parent SubHub (of type Content) or the
   * root ContentMap.map object (of type ContentMap) if the SubHub is not found.
   * @param subHubSlug The slug o the SubHub we are looking for
   * @param subHub The current SubHub we are looking in
   */
  findParentSubHub(subHubSlug: string, subHub: Content | ContentMap): Content | ContentMap {
    if (subHub[subHubSlug]) { return subHub; }; // If the subHub is in the current SubHub

    const childSubHubs: string[] = Object.keys(subHub) // Otherwise look at its children
      .filter(key => subHub[key].typeName === 'SubHub')

    for (const childSubHub of childSubHubs) {
      const parentSubHub = this.findParentSubHub(subHubSlug, subHub[childSubHub]);
      if (parentSubHub) { return parentSubHub; }
    }
  }

  /**
   * This function adds a SubHub to the correct place in SubHubMap.map.
   *
   * It first checks if the SubHub is already known (by calling findParentSubHub()), if so,
   * it adds it to the returned parent SubHub, otherwise it adds it to the root SubHubMap.map
   * object.
   *
   * It then loops through the SubHub's child pages, and checks if any of these are SubHubs. If
   * it finds any, it then checks if those are already known SubHubs. If so, it moves the existing
   * SubHubs (and all their child objects) to this new SubHub, and deletes them from their existing
   * position.
   *
   * The generated SubHubMap.map object is later used to generate the SubHubMap.routes object.
   *
   * @param subHub The SubHub object returned from the GetAllSubHubChildPagesSlugsGQL query
   */
  addSubHub(subHub: SubHubFromQuery): void {
    const parentSubHub: Content | ContentMap =
      this.findParentSubHub(subHub.slug, this.map) || this.map; // Parent SubHub (or root SubHubMap)
    parentSubHub[subHub.slug] = new Content(subHub.slug, subHub.__typename); // Add to the right parent subhub

    for (const subHubChildPage of subHub.internalPagesCollection.items) { // Then loop through its child pages
      if (subHubChildPage.__typename === 'SubHub') { // If the child page is a SubHub, check if its known
        const subHubChildPageExistingParentSubHub = this.findParentSubHub(subHubChildPage.slug, this.map);
        if (subHubChildPageExistingParentSubHub) { // The child SubHub is known, so move it here
          parentSubHub[subHub.slug][subHubChildPage.slug] = subHubChildPageExistingParentSubHub[subHubChildPage.slug];
          delete subHubChildPageExistingParentSubHub[subHubChildPage.slug]; // Then delete it from its existing place
        } else { // The SubHub is not known, so just add it as a child page
          parentSubHub[subHub.slug][subHubChildPage.slug] = new Content(subHubChildPage.slug, subHubChildPage.__typename);
        }
      } else { // This is not a SubHub so just add it to the new SubHub without checking if it's already known
        parentSubHub[subHub.slug][subHubChildPage.slug] = new Content(subHubChildPage.slug, subHubChildPage.__typename);
      }
    }
  }

  /**
   * Helper function that returns the type of a page given a particular path, e.g. /cer/our-services/engagement/first-article
   * will return 'Article'
   * @param url Path to content
   */
  getType = (url) => url.split('/').reduce((obj, key) => obj && obj[key], this.map).typeName;

  /**
   * This function pushes new routes to the SubHubMap.routes array, using the slug of the content item to be added,
   * and then (if the content is a SubHub) recursively calling itself on any of its child pages.
   * @param curObject the Content item to create a route for
   * @param curPath the path to the current item's parent
   */
  populateRouteArray(curObject: Content, curPath = '') {
    curPath = curPath ? curPath + '/' + curObject.slug : curObject.slug;

    this.routes.push({
      path: curPath,
      loadChildren: () => import(`../components/${curObject.typeName.toLowerCase()}s/${curObject.typeName.toLowerCase()}s.module`)
        .then(m => m[curObject.typeName.toLowerCase().charAt(0).toUpperCase() + curObject.typeName.toLowerCase().slice(1) + 'sModule']),
      data: { slug: curObject.slug }
    });

    if (curObject.isSubHub()) {
      for (const subHubChildKey of curObject.ChildKeys) {
        this.populateRouteArray(curObject[subHubChildKey], curPath);
      }
    }

  }
}
