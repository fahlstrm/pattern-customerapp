import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Replace this with logged in user
  private user = 1;

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8000/api/";

  setUser(user: number): void {
    this.user = user;
  }

  getCities(): Observable<any> {
    const citiesUrl = this.baseUrl + "cities";
    return this.http.get<any>(citiesUrl);
  }

  getCity(id: number): Observable<any> {
    const cityUrl = this.baseUrl + "cities/" + id;
    return this.http.get<any>(cityUrl);
  }

  getStations(): Observable<any> {
    const stationsUrl = this.baseUrl + "stations";
    return this.http.get<any>(stationsUrl);
  }

  getScooters(): Observable<any> {
    const scootersUrl = this.baseUrl + "scooters";
    return this.http.get<any>(scootersUrl);
  }

  // Sets customer ID at start of ride
  putStart(id: number): any {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    const data = {
      "customer_id": this.user
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
        return ret;
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
  }

  // For parking outside designated parking areas
  putStreetPark(id: number): any {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    const data = {
      "customer_id": "setNull",
      "station_id": "setNull"
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
        return ret;
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
  }

  // For parking in designated parking areas or charging stations
  putPark(id: number, station: number, lat_pos: any, lon_pos: any, type: string): any {
    const scooterUrl = this.baseUrl + "scooters/" + id;
    let data;
    if (type == "charge") {
      data = {
        "customer_id": "setNull",
        "station_id": station,
        "lat_pos": lat_pos,
        "lon_pos": lon_pos,
        "status": "maintenance"
      }
    } else {
      data = {
        "customer_id": "setNull",
        "station_id": station,
        "lat_pos": lat_pos,
        "lon_pos": lon_pos
      }
    }
    return this.http.put<any>(scooterUrl, data)
    .subscribe({
      next: ret => {
        return ret;
      },
      error: error => {
        console.error('There was an error!', error);
        console.log("ERROR")
      }
    });
  }

  githubRedirect(): Observable<any> {
    const redirectUrl = this.baseUrl + "auth/github/redirect";
    return this.http.get<any>(redirectUrl);
  }

  checkUser(): Observable<any> {
    const checkUrl = this.baseUrl + "auth/github/check-usertype";
    return this.http.get<any>(checkUrl, { withCredentials: true });
  }
}
