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

  // Sets customer ID at start of ride
  putStart(id: number) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": this.user
    }
    return this.http.put<any>(scooterUrl, data)
  }

  // For parking outside designated parking areas
  putStreetPark(id: number) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": "setNull",
      "station_id": "setNull"
    }
    return this.http.put<any>(scooterUrl, data)
  }

  // For parking in designated parking areas or charging stations
  putPark(id: number, station: number, lat_pos: any, lon_pos: any) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": "setNull",
      "station_id": station,
      "lat_pos": lat_pos,
      "lon_pos": lon_pos
    }
    return this.http.put<any>(scooterUrl, data)
  }
}