import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Collection {
  __typename: string;
  items: [Content]
}
interface Content {
  __typename: string;
  slug: string;
  title: string;
  ssoProtected: boolean;
  summary: string;
  icon: {
    title: string;
    description: string;
    url: string;
  }
}

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  @Input() collection: Collection;

  constructor() { }

  ngOnInit(): void {
  }

}
