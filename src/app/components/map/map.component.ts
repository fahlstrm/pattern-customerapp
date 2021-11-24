import { Component, OnInit, NgZone } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { Subject, Subscription } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';
import { CityService } from 'src/app/services/city.service';
import { ScootersService } from 'src/app/services/scooters.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  layers!: Array<any>
  scooters!: Array<any>
  parkings!: Array<any>
  scooterActive!: boolean;
  subscription: Subscription;
  sub_city: Subscription;
  cityCenter = latLng([ 58.396830, 13.853019 ]);

// Base layers
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  icon = icon({
    iconSize: [ 40, 40 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: '../../../assets/img/scooter.png',
    // shadowUrl: 'leaflet/marker-shadow.png'
  })

  parkingIcon = icon({
    iconSize: [ 35, 35 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: '../../../assets/img/parking.png',
    // shadowUrl: 'leaflet/marker-shadow.png'
  })

  chargeIcon = icon({
    iconSize: [ 40, 40 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: '../../../assets/img/charge.png',
    // shadowUrl: 'leaflet/marker-shadow.png'
  })

  // Zoom and center options
  options = {
    zoom: 14,
    center: this.cityCenter
  };

constructor(private zone: NgZone, private activateService: ActivateService, private scootersService: ScootersService, private cityService: CityService) {
  this.subscription = this.activateService.onToggle()
    .subscribe(value => {
      this.scooterActive = value;
      this.addMapContent();
    });
    this.sub_city = this.cityService.onSet()
    .subscribe(value => {
      this.cityCenter = latLng([value[0].lat_center, value[0].lon_center]);
      this.addMapContent();
    });
}

ngOnInit(): void {
  this.addMapContent();
}

addMapContent() {

  // Add base layers
  this.layers = [
    this.streetMaps,
    this.wMaps
  ]

  if (this.scooterActive) {
    // Add parking markers to map
    this.addStations();
  }
  
  if (!this.scooterActive) {
    // Add scooter markers to map
    this.addScooters();
  }
}

// Adds scooters to map
addScooters() {
  this.scootersService.getScooters()
    .subscribe((data) => {
      this.scooters = data;
      this.scooters.forEach(s => {
        this.layers.push(marker([ s.lat_pos, s.lon_pos], {
          icon: this.icon
        }).addEventListener("click", () => {
          this.zone.run(() => this.activateService.markerClick(s.id, s.battery_level));
        }));
      });
    });
}

// Adds stations to map
addStations() {
  this.scootersService.getParkings()
    .subscribe((data) => {
      this.parkings = data;
      this.parkings.forEach(p => {
        this.layers.push(marker([ p.lat_center, p.lon_center], {
          icon: p.type == "park" ? this.parkingIcon : this.chargeIcon
        }).addEventListener("click", () => {
          this.zone.run(() => this.activateService.parkClick(p.id, p.lat_center, p.lon_center, p.location, p.type));
        }));
      });
    });
}

}
