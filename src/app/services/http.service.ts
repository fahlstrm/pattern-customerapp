import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Replace this with logged in user
  private user = 1;

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8000/api/";

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
    console.log(scooterUrl)
    console.log(data)
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
  }

  // For parking outside designated parking areas
  putStreetPark(id: number) {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data = {
      "customer_id": "setNull",
      "station_id": "setNull"
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
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
    .subscribe({
      next: ret => {
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
  }

  githubRedirect() {
    const redirectUrl = this.baseUrl + "auth/github/redirect";
    return this.http.get<any>(redirectUrl);
  }

  checkUser() {
    const checkUrl = this.baseUrl + "auth/github/check-usertype";
    return this.http.get<any>(checkUrl, { withCredentials: true });
  }

  // setUser(id) {
  //   this.user = 
  // }
}
