import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/app.material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HumanCasePipe } from '@pipes/human-case.pipe';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { RouterModule } from '@angular/router';
import { RichTextToHTML } from '@pipes/rich-text.pipe';
import { BodyMediaComponent } from './body-media/body-media.component';
import { CardsComponent } from './cards/cards.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LargeCardsComponent } from './large-cards/large-cards.component';
import { VideoCardComponent } from './video-card/video-card.component';


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
    ErrorDialogComponent,
    ConfirmDialogComponent,
    HumanCasePipe,
    RichTextToHTML,
    CollectionListComponent,
    BodyMediaComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
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
    CollectionListComponent,
    CardsComponent,
    BreadcrumbsComponent,
    LargeCardsComponent,
    VideoCardComponent
  ],
  providers: [],
})
export class SharedModule {
}
