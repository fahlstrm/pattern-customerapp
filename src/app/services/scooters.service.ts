import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  constructor(private httpService: HttpService) { }

  getScooters(): Observable<any> {
    return this.httpService.getScooters()
  }

  getParkings(): Observable<any>  {
    return this.httpService.getStations()
  }
}
