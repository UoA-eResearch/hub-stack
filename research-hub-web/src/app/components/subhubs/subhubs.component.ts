import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AllSubHubChildPagesGQL,
  AllSubHubChildPagesQuery,
  AllContentItemParentSubHubsGQL,
  AllContentItemParentSubHubsQuery,
  SubHubCollection,
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

  public allContentItemParentSubHubs$: Observable< AllContentItemParentSubHubsQuery["subHubCollection"] >;

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

      this.allSubHubChildPages$ = this.getSubHubInfoAndChildren(this.slug);

      this.allContentItemParentSubHubs$ = this.getPossibleParentPages(this.slug);

      const GetSubHubParentsObserver = {
        next: (contentItemLinkedSubHubs) => {
          this.parentSubHubs = this.getParentSubHubsFromCurrentSlug(contentItemLinkedSubHubs, this.slug);
        },
      };

      this.allContentItemParentSubHubs$.subscribe(GetSubHubParentsObserver);
    });
  }

  /**
   * Retrieves all subhubs that link to this current page/subhub.
   * @param slug Page slug
   */
  public getPossibleParentPages(slug: string): Observable<SubHubCollection> {
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
  public getSubHubInfoAndChildren(slug: string): Observable<SubHubCollection> {
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
  private getParentSubHubsFromCurrentSlug(
    contentItemsLinkedSubHubs: any,
    currentPageSlug: any
  ) {
    let parentSubHubs = [];
    contentItemsLinkedSubHubs.map((linkedItem) => {
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
          console.log(`Contains ${parentSubHubs.length} subhubs: `, parentSubHubs);
        });
    });
    return parentSubHubs;
  }
}
