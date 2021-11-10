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
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('slug')),
      mergeMap((slug: string) => from(this.cerGraphQLService.getParentSubHubs(slug)))
    ).subscribe((result) => this.parentSubHubs = result);
  }
}
