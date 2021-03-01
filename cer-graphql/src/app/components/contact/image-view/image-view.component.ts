import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageViewDialogComponent} from '../image-view-dialog/image-view-dialog.component';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  width: string;

  @Input()
  height: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    this.dialog.open(ImageViewDialogComponent, {
      width: this.width,
      height: this.height,
      data: {src: this.src }
    });
  }
}
