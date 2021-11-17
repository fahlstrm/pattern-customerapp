import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private subject = new Subject<any>();

  private cities = [
    // {
    //   "id": 1,
    //   "name": "Tidaholm",
    //   "lat_pos": 58.1815656,
    //   "lon_pos": 13.9546027
    // },
    // {
    //   "id": 2,
    //   "name": "Lund",
    //   "lat_pos": 55.7048771,
    //   "lon_pos": 13.190846
    // },
    // {
    //   "id": 3,
    //   "name": "Uppsala",
    //   "lat_pos": 59.859589,
    //   "lon_pos": 17.6363316
    // }
  ]  

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
