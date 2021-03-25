import { OnDestroy, SimpleChanges } from '@angular/core';
import { SearchBarService } from '@app/components/search-bar/search-bar.service';
import { Component, OnInit, Input } from '@angular/core'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit, OnDestroy {
  public pageNumber;
  public loading: Boolean = false;
  public itemsPerPage = 10;
  public searchTextSub: Subscription;

  @Input() collection;

  @Input() type;

  constructor(public searchBarService: SearchBarService) {  }

  ngOnInit(): void {
    this.searchTextSub = this.searchBarService.currentPageChange.subscribe(() => {
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


  /**
   * Returns a material-icon name. Called in the component when a content item doesn't
   * have an avatar defined.
   * @param __typename the type for which we're searching for a default icon.
   */
  public getDefaultTypeIcon(__typename: string): string {
    switch (__typename) {
      case 'article': return 'article';
      case 'Article': return 'article';
      case 'equipment': return 'handyman';
      case 'Equipment': return 'handyman';
      case 'subHub': return 'language';
      case 'SubHub': return 'language';
      case 'service': return 'manage_accounts';
      case 'Service': return 'manage_accounts';
      case 'event': return 'event';
      case 'Event': return 'event';
      case 'software': return 'code';
      case 'Software': return 'code';
      case 'caseStudy': return 'cases';
      case 'CaseStudy': return 'cases';
      default: return 'article'
    }
  }

  public ngOnDestroy() {
    this.searchTextSub.unsubscribe();
  }
}