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
import { LinkCardComponent } from './link-card/link-card.component';
import { SoftwareComponent } from './software/software.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { OfficialDocumentComponent } from './official-document/official-document.component';
import { AssetBlockComponent } from './asset-block/asset-block.component';
import { EntryBlockComponent } from './entry-block/entry-block.component';
import { EntryInlineComponent } from './entry-inline/entry-inline.component';
import { EquipmentEntryComponent } from './equipment-entry/equipment-entry.component';
import { ArticleEntryComponent } from './article-entry/article-entry.component';
import { EventEntryComponent } from './event-entry/event-entry.component';
import { OrganisationalUnitComponent } from './organisational-unit/organisational-unit.component';
import { ServiceComponent } from './service/service.component';
import { KeywordsComponent } from './keywords/keywords.component';
import { CardsComponent } from './cards/cards.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';


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
    LinkCardComponent,
    SoftwareComponent,
    VideoCardComponent,
    CaseStudyComponent,
    OfficialDocumentComponent,
    AssetBlockComponent,
    EntryBlockComponent,
    EntryInlineComponent,
    EquipmentEntryComponent,
    ArticleEntryComponent,
    EventEntryComponent,
    OrganisationalUnitComponent,
    ServiceComponent,
    KeywordsComponent,
    CardsComponent,
    BreadcrumbsComponent
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
    SoftwareComponent,
    VideoCardComponent,
    CaseStudyComponent,
    OfficialDocumentComponent,
    AssetBlockComponent,
    EntryBlockComponent,
    EntryInlineComponent,
    EquipmentEntryComponent,
    ArticleEntryComponent,
    EventEntryComponent,
    OrganisationalUnitComponent,
    ServiceComponent,
    KeywordsComponent,
    CardsComponent,
    BreadcrumbsComponent
  ],
  providers: [],
})
export class SharedModule {
}
