import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScootersService } from './scooters.service';

describe('ScootersService', () => {
  let service: ScootersService;
  let expectedScooters: Array<any>;
  let expectedStations: Array<any>;
  let httpTestingController: HttpTestingController;
  let baseUrl = "http://localhost:8000/api/";

  beforeEach(() => {
    expectedScooters = [
      { id: 1, battery_level: 50 },
      { id: 2, battery_level: 40 }
    ]
    expectedStations = [
      { id: 1, location: "Centralstationen" },
      { id: 2, location: "Elins esplanad" }
    ]
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScootersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected scooters', () => {
    service.getScooters().subscribe(
      scooters => expect(scooters).toEqual(expectedScooters, 'should return expected scooters')
    );

    const req = httpTestingController.expectOne(baseUrl + "scooters");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedScooters);
  });

  it('should return expected stations', () => {
    service.getParkings().subscribe(
      stations => expect(stations).toEqual(expectedStations, 'should return expected stations')
    );

    const req = httpTestingController.expectOne(baseUrl + "stations");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedStations);
  });
});
