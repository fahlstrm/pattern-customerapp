import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.css']
})
export class StartDialogComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(
    public dialog: MatDialogRef<StartDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) {}

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.close({ 
      event: 'close', data: this.fromDialog 
    });
  }

}
