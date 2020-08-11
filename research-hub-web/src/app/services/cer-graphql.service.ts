import { Injectable } from '@angular/core';
import { GetAllSubHubChildPagesSlugsGQL } from '../graphql/schema';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CerGraphqlService {

  private _subHubCollectionWithChildPagesSlugs;

  constructor(
    public getAllSubHubChildPagesSlugs: GetAllSubHubChildPagesSlugsGQL,
  ) { }

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
      const breadCrumbsArray: String[] = []; // The array to be populated by the recursive function
      this._getBreadCrumbsArray(entrySlug, breadCrumbsArray); // Populate the breadcrumbs array
      return breadCrumbsArray;
    } catch (e) { console.error('Error loading breadcrumbs: ', e) }
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
  private _getBreadCrumbsArray(entrySlug: string, breadcrumbsArray: String[]) {
    for (const item of this._subHubCollectionWithChildPagesSlugs) {
      item.subhubPagesCollection.items.forEach(subPage => {
        if (subPage.slug === entrySlug) { // The SubHub's childPages contains the current entry we're searching for
          if (breadcrumbsArray.includes(item.title)) { // Check if it's already in the array (we have circular links)
            return console.error('Circular SubHub structure detected');
          }
          breadcrumbsArray.push(item.title); // Push it to the breadcrumbsArray
          return this._getBreadCrumbsArray(item.slug, breadcrumbsArray); // Call the function on the SubHub
        }
      });
    }
  }
}
