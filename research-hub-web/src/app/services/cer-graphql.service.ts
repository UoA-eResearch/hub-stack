import { Injectable } from '@angular/core';
import { GetAllSubHubChildPagesSlugsGQL } from '../graphql/schema';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router';

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
  public async pushSubHubRoutes() {
    const routes = this.router.config;
    await this._generateSubHubMapAndRoutes(); // Generate _subHubMap.map and _subHubMap.routes
    this._subHubMap.routes.forEach(route => { routes.push(route); }); // Push the new routes to the application's routes.
    this.router.resetConfig(routes);
    console.log('Generated these dynamic routes routes: ', routes);
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
  private async _loadSubHubCollection() {
    return this.getAllSubHubChildPagesSlugs.fetch().toPromise().then(x => x.data.subHubCollection.items);
  }

  /**
   * If it's not already loaded, load the SubHub collection, including the child pages slugs
   * Then call the recursive breadcrumb array builder and return the result.
   *
   * @param entrySlug The slug of the content item we are searching for breadcrumbs for
   */
  public async getParentSubHubs(entrySlug) {
    try {
      if (!this._subHubCollectionWithChildPagesSlugs) {
        this._subHubCollectionWithChildPagesSlugs = await this._loadSubHubCollection();
      }
      const breadCrumbsArray: SubHubTitleAndSlug[] = []; // The array to be populated by the recursive function
      this._getBreadCrumbsArray(entrySlug, breadCrumbsArray); // Populate the breadcrumbs array

      // If the current item belongs to a SubHub
      if (breadCrumbsArray.length) {
        const locPath = breadCrumbsArray.map(x => x.slug).reverse().join('/') + '/' + entrySlug;
        this.location.go(locPath); // Update the current location
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
      item.subhubPagesCollection.items.forEach(subPage => {
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
      .filter(x => x.slug === subHubSlug)[0].subhubPagesCollection.items
      .filter(y => y.slug === contentItemSlug)[0].__typename;
  }
}

class SubHubMap {
  map = {};
  routes: Routes = [];

  findParentSubHub(subHubSlug, subHub) {
    if (subHub[subHubSlug]) { return subHub; }; // If the subHub is in the current SubHub

    const childSubHubs = Object.keys(subHub) // Otherwise look at its children
      .filter(key => subHub[key].typeName && subHub[key].typeName === 'SubHub')

    for (const childSubHub of childSubHubs) {
      const parentSubHub = this.findParentSubHub(subHubSlug, subHub[childSubHub]);
      if (parentSubHub) { return parentSubHub; }
    }
  }

  addSubHub(subHub) {
    const parentSubHub = this.findParentSubHub(subHub.slug, this.map) || this.map; // Parent SubHub (or root SubHubMap)
    parentSubHub[subHub.slug] = { slug: subHub.slug, typeName: subHub.__typename }; // Add to the right parent subhub

    for (const subHubChildPage of subHub.subhubPagesCollection.items) { // Then loop through its child pages
      if (subHubChildPage.__typename === 'SubHub') { // If the child page is a SubHub, check if its known
        const subHubChildPageExistingParentSubHub = this.findParentSubHub(subHubChildPage.slug, this.map);
        if (subHubChildPageExistingParentSubHub) { // The child SubHub is known, so move it here
          parentSubHub[subHub.slug][subHubChildPage.slug] = subHubChildPageExistingParentSubHub[subHubChildPage.slug];
          delete subHubChildPageExistingParentSubHub[subHubChildPage.slug]; // Then delete it from its existing place
        } else { // The SubHub is not known, so just add it as a child page
          parentSubHub[subHub.slug][subHubChildPage.slug] = { slug: subHubChildPage.slug, typeName: subHubChildPage.__typename };
        }
      } else { // This is not a SubHub so just add it to the new SubHub without checking if it's already known
        parentSubHub[subHub.slug][subHubChildPage.slug] = { slug: subHubChildPage.slug, typeName: subHubChildPage.__typename };
      }
    }
  }

  getType = (url) => url.split('/').reduce((obj, key) => obj && obj[key], this.map).typeName;

  populateRouteArray(curObject, curPath = '') {

    curPath = curPath ? curPath + '/' + curObject.slug : curObject.slug;

    this.routes.push({
      path: curPath,
      loadChildren: () => import(`../components/${curObject.typeName.toLowerCase()}s/${curObject.typeName.toLowerCase()}s.module`)
        .then(m => m[curObject.typeName.toLowerCase().charAt(0).toUpperCase() + curObject.typeName.toLowerCase().slice(1) + 'sModule']),
      data: { slug: curObject.slug }
    });

    if (curObject.typeName === 'SubHub') {
      for (const subHubChild of Object.keys(curObject).filter(x => x !== 'typeName' && x !== 'slug')) {
        this.populateRouteArray(curObject[subHubChild], curPath);
      }
    }

  }
}
