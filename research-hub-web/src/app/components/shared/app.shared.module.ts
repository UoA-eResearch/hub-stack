import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { MarkdownComponent } from './markdown/markdown.component';
import { ListItemToRouterLinkPipe } from '@pipes/list-item-to-router-link.pipe';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HumanCasePipe } from '@pipes/human-case.pipe';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { RouterModule } from '@angular/router';
import { RichTextToHTML } from '@pipes/rich-text.pipe';
import { BodyMediaComponent } from './body-media/body-media.component';
import { LinkCardComponent } from './link-card/link-card.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { AssetBlockComponent } from './asset-block/asset-block.component';
import { EntryBlockComponent } from './entry-block/entry-block.component';
import { EntryInlineComponent } from './entry-inline/entry-inline.component';
import { CardsComponent } from './cards/cards.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LargeCardsComponent } from './large-cards/large-cards.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    MatCarouselModule.forRoot(),
  ],
  declarations: [
    MarkdownComponent,
    ListItemToRouterLinkPipe,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    HumanCasePipe,
    CollectionListComponent,
    RichTextToHTML,
    BodyMediaComponent,
    LinkCardComponent,
    VideoCardComponent,
    AssetBlockComponent,
    EntryBlockComponent,
    EntryInlineComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownComponent,
    ErrorDialogComponent,
    ListItemToRouterLinkPipe,
    HumanCasePipe,
    CollectionListComponent,
    RichTextToHTML,
    LinkCardComponent,
    VideoCardComponent,
    AssetBlockComponent,
    EntryBlockComponent,
    EntryInlineComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
  ],
  providers: [],
})
export class SharedModule {
}
