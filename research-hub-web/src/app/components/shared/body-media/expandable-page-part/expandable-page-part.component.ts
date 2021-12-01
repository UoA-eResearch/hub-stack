import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Expand, GetExpandPartByIdGQL, Scalars } from '@app/graphql/schema';
import { BodyMediaService } from '@services/body-media.service';
import { NodeRenderer, MarkRenderer } from 'ngx-contentful-rich-text';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public panelOpenState = false;

  constructor(
    private getExpandPartByIdGQL: GetExpandPartByIdGQL,
    public bodyMediaService: BodyMediaService,
  ) {
    this.nodeRenderers = this.bodyMediaService.nodeRenderers;
    this.markRenderers = this.bodyMediaService.markRenderers;
  }

  ngOnInit(): void {
    this.expandPart$ = this.getExpandPart();
    this.subscriptions.add(this.expandPart$.subscribe({
      next: data => {
        // For each rich text field add the links to the link maps in the body media service to enable rich text rendering
        this.bodyMediaService.buildLinkMaps(data.bodyText?.links);
      },
      error: (error) => console.error(error) // handle error here
    }));
  }

  private getExpandPart(): Observable<Expand> {
    if (!this.contentItem.sys) throw new Error(`Missing sys for Expandable page part: ${this.contentItem}`)
    return this.getExpandPartByIdGQL.fetch({ id: this.contentItem.sys.id }).pipe(
      map((result) => {
        if (result.data.expand) {
          return result.data.expand as Expand
        } else {
          throw new Error(`Could not find expandable page part for id ${this.contentItem.sys?.id}`)
        }
      })
    );
  }

  public getSummaryText(json: Scalars['JSON']): string {
    let summary: string = '';
    const maxLength = 50;
    const content: any[] = json.content;
    try {
      for (let i = 0; i < content.length; i++) {
        if (content[i].nodeType === 'paragraph') {
          for (let j = 0; j < content[i].content.length; j++) {
            if (
              content[i].content[j].nodeType === 'text' ||
              content[i].content[j].nodeType === 'entry-hyperlink' ||
              content[i].content[j].nodeType === 'asset-hyperlink' ||
              content[i].content[j].nodeType === 'hyperlink'
              ) {
              if (summary.length <= maxLength) {
                if (content[i].content[j].nodeType === 'text') {                  
                  summary = summary + (content[i].content[j]?.value ? content[i].content[j].value : '');
                } else {
                  summary = summary + (content[i].content[j]?.content[0]?.value ? content[i].content[j].content[0].value : '');
                }
              } else {
                break;
              }
            }
          }
        }
      }
      summary = summary.length > 0 ? summary.substring(0, maxLength - 3) + "..." : summary;
    } catch (e) {
      console.error(`Error creating expandable page part summary text for ${this.contentItem.sys?.id}:`, e);
    }
    return summary;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
