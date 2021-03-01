import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import * as marked from 'marked';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {

  dataConverted: string;
  renderer = new marked.Renderer();
  markedEngine = marked.setOptions({
    renderer: this.renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  constructor(public sanitizer: DomSanitizer) {}

  @Input('data')
  set data(val: string) {
    val = val || '';

    //  Renders a link as either a standard <a> tag, or as an <iframe> if it is a YouTube embedded link
    this.renderer.link = function (href, title, linkText) {
      return href.includes('youtube.com/embed') ?
        `<iframe class="youtube-embedded" src="${href}" frameborder="0" allowfullscreen></iframe>` :
        `<a href="${href}">${linkText}</a>`;
    };

    this.dataConverted = this.markedEngine.parse(val);
  }

}
