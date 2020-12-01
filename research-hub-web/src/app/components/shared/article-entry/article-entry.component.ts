import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-entry',
  templateUrl: './article-entry.component.html',
  styleUrls: ['./article-entry.component.scss']
})
export class ArticleEntryComponent implements OnInit {

  @Input() contentItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
