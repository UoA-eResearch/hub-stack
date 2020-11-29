import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeRenderer } from 'ngx-contentful-rich-text';
import { BodyMediaService} from '@services/body-media.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body-media',
  templateUrl: './body-media.component.html',
  styleUrls: ['./body-media.component.scss']
})
export class BodyMediaComponent extends NodeRenderer implements OnInit, OnDestroy {
  public data;
  public contentItem;
  public youtube;
  public iframeLink;
  public youtubRegexp = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  public youtubeRegexpID = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  public mediaSub: Subscription;

  constructor(
    private bodyMediaService: BodyMediaService,
    private sanitizer: DomSanitizer) 
  { super(); }

  async ngOnInit() {
    this.data = this.node;

    /**
     * Get BodyMedia for current content from BodyMedia service
     */
    this.mediaSub = this.bodyMediaService.bodyMedia.subscribe(x => {

      /**
       * Switch case based on response nodeType
       * filter response data by piping e.g. x.assets.(nodeType).filter((id) => id == this.data.data.target.sys.id)
       */
      switch(this.data.nodeType) {
        case 'embedded-asset-block':
          this.contentItem = x.assets['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-block':
          this.contentItem = x.entries['block'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'embedded-entry-inline':
          this.contentItem = x.entries['inline'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'entry-hyperlink':
          this.contentItem = x.entries['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        case 'asset-hyperlink':
          this.contentItem = x.assets['hyperlink'].find(x => x.sys.id == this.data.data.target.sys.id);
          break;
        /**
         * 
        case 'hyperlink':
          /**
           * Check if the link is a YouTube link
           * Sanitize the YouTube link
           * Convert standard YouTube link to an embed link for iframe
           * 
          this.youtube = this.validateYoutube();
          this.iframeLink = `//www.youtube.com/embed/${this.getYoutubeId(this.data.data.uri)}`;
          this.contentItem = { 
            "title": this.data.content[0].value, 
            "url": this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeLink)
          }
          break;
          */
      }
    });
  }

  /**
   * Validates the url to determine if it is a valid YouTube url
   */
  validateYoutube() {
    return (this.data.data.uri.match(this.youtubRegexp)) ? true : false;
  }

  /**
   * Get the YouTube URL ID to create an embed link for the video iframe
   * @param url 
   */
  getYoutubeId(url) {
    const match = url.match(this.youtubeRegexpID);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  async ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
