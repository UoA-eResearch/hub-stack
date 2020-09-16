import { Component, OnInit, SimpleChanges, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { SearchResultsComponentService } from '../search-results-component.service';
import { Observable } from 'rxjs';
import { Page } from '../../../model/Page';
import { ListItem } from '../../../model/ListItem';
import { CategoryId, CategoryDisplayNames } from '../../../services/options.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnChanges {

  /**
  * ID of the selcted category, as defined in the CategoryId enum.
  */
  @Input()
  private selectedCategory: number;
  @Output()
  public selectedCategoryChange: EventEmitter<number> = new EventEmitter<number>();

  isSelectedCategoryAll: boolean;
  /**
   * Should the list be presented in a horizontal or vertical way?
   * Defaults to horizontal.
   */
  @Input()
  public compact = false;

  public results$: Observable<Page<ListItem>>;
  public resultsCategories$: Observable<Array<Object>>;

  /**
   * Gets the proper category name from the category name displayed to the user.
   * Necessary because of discrepancies between item category description and backend name (enums could be updated in future)
   */
  public getCategoryName(displayName: string) {
    // Try look up if there's a corresponding category name for the display name.
    for (const name in CategoryDisplayNames) {
      if (CategoryDisplayNames[name] === displayName) {
        return name;
      }
    }
    // If it doesn't exist in the display names map,
    // we assume the display name is the category name.
    return displayName;
  }

  public getCategoryDisplayName(categoryId: number): string {
    if (categoryId === null || categoryId === undefined) {
      return '';
    }
    const categoryName: string = CategoryId[categoryId];
    const displayName: string = CategoryDisplayNames[categoryName];
    if (!displayName) {
      return categoryName;
    }
    return displayName;
  }

  public getCurrentCategoryDisplayName() {
    return this.getCategoryDisplayName(this.selectedCategory);
  }

  // Update the category if someone clicks a category in the mat-list search results list
  onCategorySelected(categoryDisplayName: string) {
    const category = this.getCategoryName(categoryDisplayName);
    this.selectedCategoryChange.emit(CategoryId[category]);
  }

  /**
   * Checks if the passed string corresponds with the currently searched for category.
   * Used to highlight the mat-chip corresponding to the currently searched category.
   * @param {string} category
   */
  public isCurrentCategory(categoryDisplayName: string) {
    return this.getCategoryName(categoryDisplayName) == CategoryId[this.selectedCategory];
  }

  constructor(private componentService: SearchResultsComponentService) {
  }

  ngOnInit() {
    this.results$ = this.componentService.results$;
    this.resultsCategories$ = this.componentService.resultsCategories$;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Set whether we are in All Categories.
    if (!!changes['selectedCategory']) {
      this.isSelectedCategoryAll = changes['selectedCategory'].currentValue === CategoryId.All;
    }

  }

}
