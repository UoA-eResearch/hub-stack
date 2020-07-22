import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AllSubHubChildPagesGQL,
  AllSubHubChildPagesQuery,
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

  constructor(
    private route: ActivatedRoute,
    public AllSubHubChildPagesGQL: AllSubHubChildPagesGQL
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params["slug"];
      console.log(slug);
      // todo: find out how pass in slug to the query.
      // test slug: landing-page-for-a-sub-hub

      if (!!slug) {
        console.log(slug);
        // query for slug's target subhub info + items here
      } else {
        console.log('no slug');
        // render generic test about all the subhubs of the r-hub
      }

      // in theory contains an array of 1 which contains the subhub in the slug.
      this.allSubHubChildPages$ = this.AllSubHubChildPagesGQL.fetch({
        slug,
      }).pipe(pluck("data", "subHubCollection"));
    });
  }
}
