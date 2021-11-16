import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  constructor() { }

  getScooters() {
    let scooters = [
      {
        "id": 1,
        "lat_pos": 58.1757724, 
        "lon_pos": 13.95199413
      },
      {
        "id": 2,
        "lat_pos": 58.18039916, 
        "lon_pos": 13.95370106
      },
      {
        "id": 3,
        "lat_pos": 58.18416013, 
        "lon_pos": 13.95572197
      },
      {
        "id": 4,
        "lat_pos": 58.18454814, 
        "lon_pos": 13.95281496
      },
      {
        "id": 5,
        "lat_pos": 58.18779298, 
        "lon_pos": 13.96334878
      },
      {
        "id": 6,
        "lat_pos": 58.17970669, 
        "lon_pos": 13.9401712 
      },
      {
        "id": 7,
        "lat_pos": 58.18342244, 
        "lon_pos": 13.96871113 
      },
      {
        "id": 8,
        "lat_pos": 58.18500847,
        "lon_pos": 13.94677084
      }
    ]

    return scooters
  }

  getParkings() {
    let parkings = [
      {
        "id": 1,
        "lat_pos": 58.18009269, 
        "lon_pos": 13.94968517,
        "type": "charge"
      },
      {
        "id": 2,
        "lat_pos": 58.18617525, 
        "lon_pos": 13.95874366,
        "type": "regular"
      },
    ]

    return parkings
  }
}
