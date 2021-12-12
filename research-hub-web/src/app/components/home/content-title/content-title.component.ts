import { Component, Input, OnInit } from '@angular/core';
import { Maybe } from '@app/graphql/schema';

@Component({
  selector: 'app-content-title',
  templateUrl: './content-title.component.html',
  styleUrls: ['./content-title.component.scss']
})
export class ContentTitleComponent {
  @Input() title: Maybe<string>;
  @Input() description: string = '';
  @Input() lightColorText: boolean = false;

  constructor() { }

}
