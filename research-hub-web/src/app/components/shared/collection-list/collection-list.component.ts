import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Component, OnInit, Input } from '@angular/core'
import { Subscription } from 'rxjs';
import { ContentTypeDisplayNames } from '@app/global/global-variables';
import { titleCase } from "title-case";
import { isUpperCase } from "is-upper-case";

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit, OnDestroy, OnChanges {
  public pageNumber;
  public loading: Boolean = false;
  public itemsPerPage = 10;
  public searchTextSub: Subscription;

  @Input() collection;
  @Input() type;

  constructor(public searchBarService: SearchBarService) {  }

  ngOnInit(): void {
    this.searchTextSub = this.searchBarService.totalPagesChange.subscribe(() => {
      this.loading = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageNumber = this.searchBarService.getCurrentPage();
    try { this.collection = changes['collection'].currentValue; this.loading = false } catch {}
  }


  // Next page on search
  nextPage($event) {
    this.searchBarService.setCurrentPage($event);
    this.searchBarService.createResultsList();
    this.scrollToTop();
  }


  // Reset pageNumber to 1 if results are out of bounds
  public resetPage() {
    this.searchBarService.setCurrentPage(1);
    this.scrollToTop();
  }


  // Scrolling to top of page on search
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchOnKeyword(keyword) {
    if (Object.values(ContentTypeDisplayNames).includes(keyword)) {
      // do nothing for now - needs to be handled as another filter type
      
      // get the correct type name e.g. 'Topic' = 'subHub'
      // const type = Object.keys(ContentTypeDisplayNames)[Object.values(ContentTypeDisplayNames).indexOf(keyword)];
      // this.searchBarService.setContentType([type]);
      // this.searchBarService.setSearchText('');
      // this.searchBarService.setCurrentPage(1);
      // this.searchBarService.createResultsList();

    } else {
      // this.searchBarService.setSort('');
      // this.searchBarService.setStage([]);
      // this.searchBarService.setCategory([]);
      // this.searchBarService.setOrganisation([]);
      this.searchBarService.setCurrentPage(1);
      this.searchBarService.setSearchText(keyword);
      this.searchBarService.createResultsList();
      this.searchBarService.setCurrentPage(1);
      this.searchBarService.createResultsList();
    }    
  }

  toTitleCase(keyword: string) {
    const exceptions = ['www', 'dmp', 'sgs', 'pyr'];
    if (exceptions.includes(keyword)) {
      return keyword.toUpperCase();
    }
    if (keyword.toLowerCase() === 'phd') {
      return 'PhD';
    }
    if (isUpperCase(keyword)) {
      return keyword;
    } else {
      return titleCase(keyword);
    }
  }

  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename.toLowerCase()) {
      case 'article': return 'article';
      case 'equipment': return 'handyman';
      case 'subhub': return 'language';
      case 'service': return 'manage_accounts';
      case 'event': return 'event';
      case 'software': return 'code';
      case 'casestudy': return 'cases';
      case 'funding': return 'paid';
      default: return 'article'
    }
  }

  public ngOnDestroy() {
    try { this.searchTextSub.unsubscribe(); } catch {};
  }
}
