import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private subject = new Subject<any>(); 

  constructor(private httpService: HttpService) {
    this.getCities()
  }

  // Changes active city
  setCity(id: any): void {
    this.httpService.getCity(id)
    .subscribe((data) => {
      this.subject.next(data)
    })
  }

  // Returns new active city object to map
  onSet(): Observable<any> {
    return this.subject.asObservable();
  }

  // Gets all city objects
  getCities(): Observable<any> {
    return this.httpService.getCities()   
  }
}
