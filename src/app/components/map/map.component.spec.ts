import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MapComponent } from './map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScootersService } from 'src/app/services/scooters.service';
import { of } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';
import { CityService } from 'src/app/services/city.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let serviceStub: any;
  let activateStub: any;
  let cityStub: any;


  beforeEach(async () => {
    serviceStub = {
      getParkings: () => of([{"id":9,"city_id":1,"location":"Golfklubben","lat_center":"58.378826","lon_center":"13.817974","radius":"0.002","type":"park"}]),
      getScooters: () => of([{"id":1,"customer_id":null,"city_id":1,"station_id":9,"lat_pos":"58.399560","lon_pos":"13.723922","speed_kph":0,"battery_level":68,"status":"active"}]),
    }
    activateStub = {
      onToggle: () => of(true),
    }
    cityStub = {
      onSet: () => of([{"id":1, "name": "Uppsala", "lat_center":"58.399560","lon_center":"13.723922"}])
    }
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientTestingModule ],
      providers: [ {provide: ScootersService, useValue: serviceStub }, {provide: ActivateService, useValue: activateStub }, {provide: CityService, useValue: cityStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get parkings for map', () => {
    component.addStations();
    expect(component.parkings).toBeTruthy();
    expect(component.parkings).toEqual(jasmine.arrayContaining(
      [{"id":9,"city_id":1,"location":"Golfklubben","lat_center":"58.378826","lon_center":"13.817974","radius":"0.002","type":"park"}]
    ));
  });

  it('should get scooters for map', () => {
    component.addScooters();
    expect(component.scooters).toBeTruthy();
    expect(component.scooters).toEqual(jasmine.arrayContaining(
      [{"id":1,"customer_id":null,"city_id":1,"station_id":9,"lat_pos":"58.399560","lon_pos":"13.723922","speed_kph":0,"battery_level":68,"status":"active"}]
    ));
  });

  it('should toggle map view', () => {
    component.scooterActive = false;
    fixture.detectChanges();
    spyOn(component, 'addScooters');
    component.addMapContent();
    expect(component.addScooters).toHaveBeenCalled();
  });
});
