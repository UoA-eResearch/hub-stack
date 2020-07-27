import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AllSubHubChildPagesGQL,
  AllSubHubChildPagesQuery,
  AllContentItemParentSubHubsGQL,
  AllContentItemParentSubHubsQuery,
} from "../../graphql/schema";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";

@Component({
  selector: "app-subhubs",
  templateUrl: "./subhubs.component.html",
  styleUrls: ["./subhubs.component.scss"],
})
export class SubhubsComponent implements OnInit {
  public allSubHubChildPages$: Observable<
    AllSubHubChildPagesQuery["subHubCollection"]
  >;

  public allContentItemParentSubHubs$: Observable<
    AllContentItemParentSubHubsQuery["subHubCollection"]
  >;

  public parentSubHubs =  [];

  constructor(
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL,
    public AllContentItemParentSubHubsGQL: AllContentItemParentSubHubsGQL
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const currentPageSlug = params["slug"];
      // test slug: landing-page-for-a-sub-hub

      if (!!currentPageSlug) {
        console.log(currentPageSlug);
        // query for slug's target subhub info + items here
      } else {
        console.log("no slug");
        // render generic test about all the subhubs of the r-hub
      }

      // in theory contains an array of 1 which contains the subhub in the slug.
      this.allSubHubChildPages$ = this.AllSubHubChildPagesGQL.fetch({
        slug: currentPageSlug,
      }).pipe(pluck("data", "subHubCollection"));

      this.allContentItemParentSubHubs$ = this.AllContentItemParentSubHubsGQL.fetch(
        {
          slug: currentPageSlug,
        }
      ).pipe(pluck("data", "subHubCollection"));

      this.allContentItemParentSubHubs$ = this.AllContentItemParentSubHubsGQL.fetch(
        {
          slug: currentPageSlug,
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
      );

      const GetSubHubParentsObserver = {
        next: (contentItemLinkedSubHubs) => {
          this.parentSubHubs = this.getParentSubHubsFromCurrentSlug(contentItemLinkedSubHubs, currentPageSlug);
        },
      };

      this.allContentItemParentSubHubs$.subscribe(GetSubHubParentsObserver);
    });
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
