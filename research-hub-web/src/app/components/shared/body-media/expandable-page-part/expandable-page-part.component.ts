import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Expand, GetExpandPartByIdGQL } from '@app/graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { NodeRenderer, MarkRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Exandable page part is a special type of rich text entry which itself contains rich text. For this reason it is
 * handled differently from the other rich text types. It is a type of embedded entry block (see BlocksEmbeddedEntryComponent), so
 * the top level node is handled in that component, but the nested rich text contained within the expandable part is handled here.
 * The BlocksEmbeddedEntryComponent passes the ID for the expand part to this component, where we can then fetch the rich text from the 
 * graphql API. This also avoids any nested/recursive calls (e.g. there could be an expandable part within an expandable part) to the api.
 */
@Component({
  selector: 'app-expandable-page-part',
  templateUrl: './expandable-page-part.component.html',
  styleUrls: ['./expandable-page-part.component.scss']
})
export class ExpandablePagePartComponent implements OnInit, OnDestroy {
  @Input() contentItem: Partial<Expand>; // basically just the id of the expand e.g. { "__typename": "Expand", "sys": { "id": "3sOzm7PRhsgcGibaW73EXN", "__typename": "Sys" } }
  
  public expandPart$: Observable<Expand>;
  private subscriptions = new Subscription();
  
  public nodeRenderers: Record<string, Type<NodeRenderer>>;
  public markRenderers: Record<string, Type<MarkRenderer>>;

  constructor(
    private getExpandPartByIdGQL: GetExpandPartByIdGQL,
    public bodyMediaService: BodyMediaService,
  ) {
    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
  }

  ngOnInit(): void {
    this.expandPart$ = this.getExpandPart();
    this.subscriptions.add(this.expandPart$.subscribe(data => {
      // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
      this.bodyMediaService.buildLinkMaps(data.bodyText?.links);
    }));
  }

  private getExpandPart(): Observable<Expand> {
    try {
      return this.getExpandPartByIdGQL.fetch({ id: this.contentItem.sys.id }).pipe(
        pluck('data', 'expand')
      ) as Observable<Expand>;
    } catch (e) {
      console.error(`Error loading expandable page part ${this.contentItem.sys.id}:`, e);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
