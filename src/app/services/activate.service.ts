import { Injectable, Output } from '@angular/core';
import  { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StartDialogComponent } from '../components/start-dialog/start-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  private scooterActive: boolean = false;
  private subject = new Subject<any>();

  constructor(public dialog: MatDialog) { }

  markerClick(id: any) {
    console.log("Du har valt scooter" + id)
    let dialogRef = this.dialog.open(StartDialogComponent, {
      data: {scooter: id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
      if (result == "true") {
        this.toggleActive();
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
}
