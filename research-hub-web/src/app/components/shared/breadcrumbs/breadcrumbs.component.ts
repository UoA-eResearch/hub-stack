import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() contentItem;
  @Input() title;

  constructor() { }

  ngOnInit(): void {
    console.log(this.contentItem);
    console.log(this.title);
  }

}
