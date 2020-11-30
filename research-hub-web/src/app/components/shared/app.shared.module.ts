import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { GenericContactComponent } from './generic-contact/generic-contact.component';
import { LinkCardComponent } from './link-card/link-card.component';
import { SoftwareComponent } from './software/software.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { OfficialDocumentComponent } from './official-document/official-document.component';
import { AssetBlockComponent } from './asset-block/asset-block.component';
import { EntryBlockComponent } from './entry-block/entry-block.component';
import { EntryInlineComponent } from './entry-inline/entry-inline.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
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
    GenericContactComponent,
    LinkCardComponent,
    SoftwareComponent,
    VideoCardComponent,
    CaseStudyComponent,
    OfficialDocumentComponent,
    AssetBlockComponent,
    EntryBlockComponent,
    EntryInlineComponent
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
    RichTextToHTML
  ],
  providers: [],
})
export class SharedModule {
}
