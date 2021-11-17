import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Replace this with logged in user
  private user = 1;

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/";

  getCities() {
    const citiesUrl = this.baseUrl + "cities";
    return this.http.get<any>(citiesUrl);
  }

  getCity(id: any) {
    const cityUrl = this.baseUrl + "cities/" + id;
    return this.http.get<any>(cityUrl);
  }

  getStations() {
    const stationsUrl = this.baseUrl + "stations";
    return this.http.get<any>(stationsUrl);
  }

  getScooters() {
    const scootersUrl = this.baseUrl + "scooters";
    return this.http.get<any>(scootersUrl);
  }

  putStart(id: number) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": this.user
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
        console.log(ret)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  // Funkar inte att skicka 0 i json
  putStreetPark(id: number) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": 0
    }
    console.log(data)
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
        console.log(ret)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  // Funkar inte att skicka 0 i json
  putPark(id: number, station: number, lat_pos: any, lon_pos: any) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": 0,
      "station_id": station,
      "lat_pos": lat_pos,
      "lon_pos": lon_pos
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
