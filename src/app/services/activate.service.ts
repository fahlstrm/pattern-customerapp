import { Injectable, Output } from '@angular/core';
import  { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StartDialogComponent } from '../components/dialogs/start-dialog/start-dialog.component';
import { ParkDialogComponent } from '../components/dialogs/park-dialog/park-dialog.component';
import { FinishSnackbarComponent } from '../components/dialogs/finish-snackbar/finish-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  private scooterActive: boolean = false;
  private scooter: any;
  private subject = new Subject<any>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  // Opens dialog on scooter marker
  markerClick(id: any) {
    let dialogRef = this.dialog.open(StartDialogComponent, {
      data: {scooter: id}
    });
    
    // Actions if rent scooter button is clicked
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log("Du har valt scooter " + id)
        this.toggleActive();
        this.scooter = id;
      }
    })
  }

  toggleActive() {
    this.scooterActive = !this.scooterActive;
    this.subject.next(this.scooterActive)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  parkClick(id: any) {
    let dialogRef = this.dialog.open(ParkDialogComponent, {
      data: {parking: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
      if (result == "true") {
        console.log("Du har parkerat scooter " + this.scooter + " på parkering " + id)
        this.toggleActive();
        this.openSnackbar();
      }
    })
  }

  openSnackbar() {
    this._snackBar.openFromComponent(FinishSnackbarComponent, {
      duration: 5000,
    });
  }
}
