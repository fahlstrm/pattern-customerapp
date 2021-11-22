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

  setCity(id: any) {
    this.httpService.getCity(id)
    .subscribe((data) => {
      this.subject.next(data)
    })
  }

  onSet(): Observable<any> {
    return this.subject.asObservable();
  }

  getCities() {
    return this.httpService.getCities()   
  }
}
