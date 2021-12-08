import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CerGraphqlService, SubHubTitleAndSlug } from '@services/cer-graphql.service';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() title: string;
  public parentSubHubs: SubHubTitleAndSlug[] = [];

  constructor(
    private route: ActivatedRoute,
    private cerGraphQLService: CerGraphqlService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => {
        return (params.slug || this.route.snapshot.data.slug) as string;
      }),
      mergeMap((slug: string) => from(this.cerGraphQLService.getParentSubHubs(slug)))
    ).subscribe((result) => this.parentSubHubs = result);    
  }
}
