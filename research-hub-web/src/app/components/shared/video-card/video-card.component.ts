import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() contentItem;

  public youtube;
  public iframeLink;
  public youtubRegexp = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  public youtubeRegexpID = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.youtube = this.validateYoutube();
      this.iframeLink = `//www.youtube.com/embed/${this.getYoutubeId(this.contentItem.url)}`;
      this.contentItem = { 
        "title": this.contentItem.title, 
        "url": this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeLink)
      }
  }

  /**
   * Validates the url to determine if it is a valid YouTube url
   */
  validateYoutube() {
    return (this.contentItem.url.match(this.youtubRegexp)) ? true : false;
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

}
