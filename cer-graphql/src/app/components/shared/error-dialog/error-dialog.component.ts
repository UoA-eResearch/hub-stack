import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  public title: string;
  public message: string;
  public closeButtonName: string;
  private timeout: number;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
    this.closeButtonName = data.closeButtonName;
    this.timeout = data.timeout;
  }

  ngOnInit() {
    if (this.timeout) {
      setTimeout(() => {
        this.dialogRef.close();
      }, this.timeout);
    }
  }
}
