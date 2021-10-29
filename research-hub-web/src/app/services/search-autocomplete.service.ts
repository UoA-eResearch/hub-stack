import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AllArticlesTitlesGQL, ArticleCollection } from '@app/graphql/schema';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {
  public allArticles$: Observable<ArticleCollection>;
  public autocompleteTerms: string[];
  
  constructor(
    private allArticlesTitlesGQL: AllArticlesTitlesGQL,
  ) { }

  private getAllArticlesTitles(): Observable<ArticleCollection> {
    try {
      return this.allArticlesTitlesGQL.fetch()
        .pipe(pluck('data', 'articleCollection')) as Observable<ArticleCollection>
    } catch (e) { console.error('Error loading all article titles:', e) };
  }

  private createAutocompleteTerms(): void {
    try {
      this.autocompleteTerms = ['test', 'test2', 'frog', 'dog'];
    } catch (e) { console.error('Error creating autocomplete terms list:', e) };
  }

  public getAutocompleteTerms(): string[] {
    return this.autocompleteTerms;
  }
}
