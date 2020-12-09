import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  @Input() contentItem;

  constructor() { }

  ngOnInit(): void {
  }

}
