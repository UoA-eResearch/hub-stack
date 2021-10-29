import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HumanCasePipe } from '@pipes/human-case.pipe';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LargeCardsComponent } from './large-cards/large-cards.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxContentfulRichTextModule } from 'ngx-contentful-rich-text';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BlocksQuoteComponent } from './body-media/blocks-quote/blocks-quote.component';
import { BlocksEmbeddedAssetComponent } from './body-media/blocks-embedded-asset/blocks-embedded-asset.component';
import { BlocksEmbeddedEntryComponent } from './body-media/blocks-embedded-entry/blocks-embedded-entry.component';
import { InlinesEmbeddedEntryComponent } from './body-media/inlines-embedded-entry/inlines-embedded-entry.component';
import { InlinesAssetHyperlinkComponent } from './body-media/inlines-asset-hyperlink/inlines-asset-hyperlink.component';
import { InlinesEntryHyperlinkComponent } from './body-media/inlines-entry-hyperlink/inlines-entry-hyperlink.component';
import { MarksCodeComponent } from './body-media/marks-code/marks-code.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    NgxContentfulRichTextModule,
    ScrollingModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    ErrorDialogComponent,
    ConfirmDialogComponent,
    HumanCasePipe,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
    VideoCardComponent,
    BlocksEmbeddedAssetComponent,
    BlocksEmbeddedEntryComponent,
    InlinesEmbeddedEntryComponent,
    BlocksQuoteComponent,
    InlinesAssetHyperlinkComponent,
    InlinesEntryHyperlinkComponent,
    MarksCodeComponent
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ErrorDialogComponent,
    HumanCasePipe,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
    VideoCardComponent,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    ScrollingModule,
    NgxContentfulRichTextModule
  ],
  providers: [],
})
export class SharedModule {
}
