import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class PageTitleService {
  _title = '';
  private readonly _originalTitle = 'Welcome to the ResearchHub';

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
    if (title !== '') {
      title = `${title} | ResearchHub`;
    } else {
      title = this._originalTitle;
    }
    this.bodyTitle.setTitle(title);
  }

  constructor(private bodyTitle: Title) { }
}
