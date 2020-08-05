import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AllSubHubChildPagesGQL,
  AllSubHubChildPagesQuery,
  AllContentItemParentSubHubsGQL,
  AllContentItemParentSubHubsQuery,
  SubHubCollection,
  SubHub
} from "../../graphql/schema";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";

@Component({
  selector: "app-subhubs",
  templateUrl: "./subhubs.component.html",
  styleUrls: ["./subhubs.component.scss"],
})
export class SubhubsComponent implements OnInit {
  public allSubHubChildPages$: Observable<SubHubCollection>;
  public allContentItemParentSubHubs$: Observable<AllContentItemParentSubHubsQuery["subHubCollection"]>;
  public parentSubHubs =  [];
  public slug: string;

  constructor(
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL,
    public AllContentItemParentSubHubsGQL: AllContentItemParentSubHubsGQL
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // test slug: landing-page-for-a-sub-hub
      this.slug = params['slug'];

      this.allSubHubChildPages$ = this.getSubHubInfoAndChildrenObservable(this.slug);

      this.allContentItemParentSubHubs$ = this.getPossibleParentPagesObservable(this.slug);

      const GetSubHubParentsObserver = {
        next: (contentItemLinkedSubHubs) => {
          this.parentSubHubs = this.getParentSubHubsFromCurrentSlug(contentItemLinkedSubHubs, this.slug);
        },
        error: (error) => {
          console.error("Could not retrieve linkedFrom items for this page.");
        }
      };
      this.allContentItemParentSubHubs$.subscribe(GetSubHubParentsObserver);
    });
  }

  /**
   * Retrieves all subhubs that link to this current page/subhub.
   * @param slug Page slug
   */
  public getPossibleParentPagesObservable(slug: string): Observable<SubHubCollection> {
    // TODO: make the possible parent retrieval recursive until no valid parent can be found.
    try {
      return this.AllContentItemParentSubHubsGQL.fetch(
        {
          slug
        }
      ).pipe(
        pluck(
          "data",
          "subHubCollection",
          "items",
          "0",
          "linkedFrom",
          "subHubCollection",
          "items"
        )
      ) as Observable<SubHubCollection>;    
    } catch (error) {
      console.log('Error retrieving possible parent pages: ', error);
    }
  }

  /**
   * Runs the query for the main body of a subhub item as including it's child pages but excluding it's ancestor/parent data.
   * @param slug Page slug
   */
  public getSubHubInfoAndChildrenObservable(slug: string): Observable<SubHubCollection> {
    try {
      return this.AllSubHubChildPagesGQL.fetch({
        slug
      }).pipe(pluck("data", "subHubCollection")) as Observable<SubHubCollection>;
    } catch (e) {
      console.error('Error loading subhub body info and children')
    }
  }

  /**
   * Checks if the linked item contains the slug/link to the current page's slug in it's "SubhubPagesCollection" field.
   * @param linkedItem A link item of the current page. Assumed to be a SubHubCollection item.
   * @param currentPageSlug The slug of the current page.
   */
  public getParentSubHubsFromCurrentSlug (
    possibleParentItems: Array<SubHub>,
    currentPageSlug: string
  ): Array<SubHub> {
    let parentSubHubs = [];
    possibleParentItems.map((linkedItem: SubHub) => {
      this.AllSubHubChildPagesGQL.fetch({
        slug: linkedItem.slug,
      })
        .pipe(
          pluck(
            "data",
            "subHubCollection",
            "items",
            0,
          )
        )
        .subscribe(subHubData => {
          // if contains any child links to the current page then it's a parent.
          let linksToCurPageAsChild  = subHubData.subhubPagesCollection.items
          .filter(childPage => !!childPage['slug'])
          .filter(childPage => childPage['slug'] === currentPageSlug);

          if (linksToCurPageAsChild.length > 0) {
            parentSubHubs.push(subHubData);
          }
        });
    });
    return parentSubHubs;
  }
}
