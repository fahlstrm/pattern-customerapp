import { Component, OnInit, NgZone } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { ActivateService } from 'src/app/services/activate.service';
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

  // Zoom and center options
  options = {
    zoom: 14,
    center: latLng([ 58.1815656, 13.9546027 ])
  };

constructor(private zone: NgZone, private activateService: ActivateService, private scootersService: ScootersService) {
}

ngOnInit(): void {
  this.addMapContent();
}

addMapContent() {
  // Scooter array, get from database
  this.scooters = this.scootersService.getScooters();
  this.parkings = this.scootersService.getParkings();

  // Add base layers
  this.layers = [
    this.streetMaps,
    this.wMaps
  ]

  // Add parking markers to map
  this.parkings.forEach(s => {
    this.layers.push(marker([ s.lat_pos, s.lon_pos], {
      icon: this.parkingIcon
    }).addEventListener("click", () => {
      this.zone.run(() => this.activateService.parkClick())
    }));
  });

  // Add scooter markers to map
  this.scooters.forEach(s => {
    this.layers.push(marker([ s.lat_pos, s.lon_pos], {
      icon: this.icon
    }).addEventListener("click", () => {
      this.zone.run(() => this.activateService.markerClick(s.id))
    }));
  });
}

}
