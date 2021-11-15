import { Injectable, Output } from '@angular/core';
import  { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StartDialogComponent } from '../components/start-dialog/start-dialog.component';
import { ParkDialogComponent } from '../components/park-dialog/park-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  private scooterActive: boolean = false;
  private scooter: any;
  private subject = new Subject<any>();

  constructor(public dialog: MatDialog) { }

  markerClick(id: any) {
    console.log("Du har valt scooter " + id)
    let dialogRef = this.dialog.open(StartDialogComponent, {
      data: {scooter: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
      if (result == "true") {
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
    console.log("Du har parkerat scooter " + this.scooter + " på parkering " + id)
    let dialogRef = this.dialog.open(ParkDialogComponent, {
      data: {parking: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`)
      if (result == "true") {
        this.toggleActive();
      }
    })
  }
}
