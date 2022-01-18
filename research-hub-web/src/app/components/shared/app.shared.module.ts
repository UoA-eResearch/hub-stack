import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { HumanCasePipe } from '@pipes/human-case.pipe';
import { ContentTypeDisplayNamePipe } from '@pipes/content-type-display-name.pipe';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { VideoCardComponent } from './video-card/video-card.component';
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
import { ExpandablePagePartComponent } from './body-media/expandable-page-part/expandable-page-part.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    NgxContentfulRichTextModule,
    ScrollingModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    HumanCasePipe,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    BreadcrumbsComponent,
    VideoCardComponent,
    BlocksEmbeddedAssetComponent,
    BlocksEmbeddedEntryComponent,
    InlinesEmbeddedEntryComponent,
    BlocksQuoteComponent,
    InlinesAssetHyperlinkComponent,
    InlinesEntryHyperlinkComponent,
    MarksCodeComponent,
    ExpandablePagePartComponent
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HumanCasePipe,
    ContentTypeDisplayNamePipe,
    CollectionListComponent,
    BreadcrumbsComponent,
    VideoCardComponent,
    NgxSkeletonLoaderModule,
    ScrollingModule,
    NgxContentfulRichTextModule
  ],
  providers: [],
})
export class SharedModule {
}
