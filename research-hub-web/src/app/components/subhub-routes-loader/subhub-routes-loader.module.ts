import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SubHubRoutesLoaderComponent } from "./subhub-routes-loader.component";

const routes = [
  { path: '', component: SubHubRoutesLoaderComponent }
];


@NgModule({
  declarations: [
    SubHubRoutesLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SubHubRoutesLoaderComponent
  ]
})
export class SubHubRoutesLoaderModule {
 }
