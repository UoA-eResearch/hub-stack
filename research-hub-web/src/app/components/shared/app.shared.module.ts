import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HumanCasePipe } from '@pipes/human-case.pipe';
import { RichTextToHTML } from '@pipes/rich-text.pipe';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { RouterModule } from '@angular/router';
import { BodyMediaComponent } from './body-media/body-media.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgxPaginationModule,
    MarkdownToHtmlModule,
    NgxSkeletonLoaderModule,
    NgxContentfulRichTextModule,
    ScrollingModule
  ],
  declarations: [
    ErrorDialogComponent,
    ConfirmDialogComponent,
    HumanCasePipe,
    RichTextToHTML,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    BodyMediaComponent,
    BreadcrumbsComponent,
    VideoCardComponent
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ErrorDialogComponent,
    HumanCasePipe,
    RichTextToHTML,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    BreadcrumbsComponent,
    VideoCardComponent,
    NgxPaginationModule,
    MarkdownToHtmlModule,
    NgxSkeletonLoaderModule,
    ScrollingModule
  ],
  providers: [],
})
export class SharedModule {
}
