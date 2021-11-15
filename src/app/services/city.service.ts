import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityActive = 1;
  private subject = new Subject<any>();

  constructor() { }

  setCity(id: any) {
    this.cityActive = id;
    this.subject.next(this.cityActive)
  }

  onSet(): Observable<any> {
    return this.subject.asObservable();
  }
}
