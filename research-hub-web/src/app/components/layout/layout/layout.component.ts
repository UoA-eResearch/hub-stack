import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-notification></app-notification>
    <app-navbar></app-navbar>
    <ng-content></ng-content>
  `,
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
