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
    RichTextToHTML
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
