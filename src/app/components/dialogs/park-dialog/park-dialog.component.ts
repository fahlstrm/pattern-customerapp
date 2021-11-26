import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-park-dialog',
  templateUrl: './park-dialog.component.html',
  styleUrls: ['./park-dialog.component.css']
})
export class ParkDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
