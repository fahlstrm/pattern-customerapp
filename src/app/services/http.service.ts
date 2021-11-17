import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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
}
