import { Component, OnInit, NgZone } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { StartDialogComponent } from '../start-dialog/start-dialog.component';
import { ActivateService } from 'src/app/services/activate.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

// Base layers
streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  detectRetina: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
  detectRetina: true,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

layers!: Array<any>
scooters!: Array<any>

icon = icon({
  iconSize: [ 40, 40 ],
  iconAnchor: [ 13, 41 ],
  iconUrl: '../../../assets/img/scooter.png',
  // shadowUrl: 'leaflet/marker-shadow.png'
})

constructor(public dialog: MatDialog, private zone: NgZone, private activateService: ActivateService) {
}

// markerClick(id: any) {
//   console.log("Du har valt scooter" + id)
//   let dialogRef = this.dialog.open(StartDialogComponent, {
//     data: {scooter: id}
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`)
    
//   })
// }

ngOnInit(): void {
  // Scooter array, get from database
  this.scooters = [
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
    },
    {
      "id": 9,
      "lat_pos": 58.18009269, 
      "lon_pos": 13.94968517
    },
    {
      "id": 10,
      "lat_pos": 58.18617525, 
      "lon_pos": 13.95874366
    },
  ]

  // Add base layers
  this.layers = [
    this.streetMaps,
    this.wMaps
  ]

  // Add scooter markers to map
  this.scooters.forEach(s => {
    this.layers.push(marker([ s.lat_pos, s.lon_pos], {
      icon: this.icon
    }).addEventListener("click", () => {
      this.zone.run(() => this.activateService.markerClick(s.id))
    }));
  });
}




// Zoom and center options
options = {
  zoom: 14,
  center: latLng([ 58.1815656, 13.9546027 ])
};

}
