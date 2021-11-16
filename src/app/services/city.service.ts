import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityActive = 1;
  private subject = new Subject<any>();

  private cities = [
    {
      "id": 1,
      "name": "Tidaholm",
      "lat_pos": 58.1815656,
      "lon_pos": 13.9546027
    },
    {
      "id": 2,
      "name": "Lund",
      "lat_pos": 55.7048771,
      "lon_pos": 13.190846
    },
    {
      "id": 3,
      "name": "Uppsala",
      "lat_pos": 59.859589,
      "lon_pos": 17.6363316
    }
  ]
  

  constructor() { }

  setCity(id: any) {
    this.cityActive = id;
    this.subject.next(this.cities.find(x => x.id === id))
  }

  onSet(): Observable<any> {
    return this.subject.asObservable();
  }

  getCities() {
    return this.cities
  }
}
