import { Injectable } from '@angular/core';
import  { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StartDialogComponent } from '../components/dialogs/start-dialog/start-dialog.component';
import { FinishSnackbarComponent } from '../components/dialogs/finish-snackbar/finish-snackbar.component';
import { ParkDialogComponent } from '../components/dialogs/park-dialog/park-dialog.component';
import { EndDialogComponent } from '../components/dialogs/end-dialog/end-dialog.component';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  private scooterActive = false;
  private scooter: any;
  private subject = new Subject<any>();

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private httpService: HttpService) { }

  // Opens dialog on scooter marker
  markerClick(id: any, battery: any): void {
    const dialogRef = this.dialog.open(StartDialogComponent, {
      data: {scooter: id, battery: battery}
    });
    
    // Actions if rent scooter button is clicked
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log("Du har valt scooter " + id)
        this.toggleActive();
        this.scooter = id;
        this.httpService.putStart(id)
      }
    })
  }

  // Toggle active ride
  toggleActive(): void {
    this.scooterActive = !this.scooterActive;
    this.subject.next(this.scooterActive)
  }

  // Send active to subscribers
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  // Opens dialog on parking marker
  parkClick(id: any, lat_pos: any, lon_pos: any, name: string, type: string): void {
    const dialogRef = this.dialog.open(ParkDialogComponent, {
      data: {parking: name}
    });
    
    // Actions if park scooter is clicked
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log("Du har parkerat scooter " + this.scooter + " på parkering " + id, lat_pos, lon_pos)
        this.httpService.putPark(this.scooter, id, lat_pos, lon_pos, type);
        this.toggleActive();
        this.openSnackbar();
      }
    })
  }

  // Opens dialog on end outside parking
  endClick(): void {
    const dialogRef = this.dialog.open(EndDialogComponent, {});
    
    // Actions if park scooter is clicked
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log("Du har parkerat scooter " + this.scooter + " på gatan.");
        this.httpService.putStreetPark(this.scooter);
        this.toggleActive();
        this.openSnackbar();
      }
    })
  }

  // Opens snackbar to let user know that the ride has finished
  openSnackbar(): void {
    this._snackBar.openFromComponent(FinishSnackbarComponent, {
      duration: 5000,
    });
  }
}
