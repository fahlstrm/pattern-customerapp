import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  constructor(private httpService: HttpService) { }

  getScooters() {
    return this.httpService.getScooters()
  }

  getParkings() {

    // return parkings
    return this.httpService.getStations()
  }
}
