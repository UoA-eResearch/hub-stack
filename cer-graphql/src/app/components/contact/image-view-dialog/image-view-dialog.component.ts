import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss']
})
export class ImageViewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
