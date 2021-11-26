import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let expectedCities: Array<any>;
  let expectedScooters: Array<any>;
  let expectedStations: Array<any>;
  let expectedCity: any;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    expectedCities = [
      { id: 1, name: 'Lund' },
      { id: 2, name: 'Uppsala' },
    ];
    expectedCity = { id: 1, name: 'Lund' };
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
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected cities', () => {
    service.getCities().subscribe(
      cities => expect(cities).toEqual(expectedCities, 'should return expected cities')
    );

    const req = httpTestingController.expectOne(service.baseUrl + "cities");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedCities);
  });

  it('should return one city', () => {
    service.getCity(1).subscribe(
      city => expect(city).toEqual(expectedCity, 'should return expected city')
    );

    const req = httpTestingController.expectOne(service.baseUrl + "cities/1");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedCity);
  });

  it('should return expected scooters', () => {
    service.getScooters().subscribe(
      scooters => expect(scooters).toEqual(expectedScooters, 'should return expected scooters')
    );

    const req = httpTestingController.expectOne(service.baseUrl + "scooters");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedScooters);
  });

  it('should return expected stations', () => {
    service.getStations().subscribe(
      stations => expect(stations).toEqual(expectedStations, 'should return expected stations')
    );

    const req = httpTestingController.expectOne(service.baseUrl + "stations");
    expect(req.request.method).toEqual('GET');

    req.flush(expectedStations);
  });

  it('should redirect to github for login', () => {
    service.githubRedirect().subscribe();
    const req = httpTestingController.expectOne(service.baseUrl + "auth/github/redirect");
    expect(req.request.method).toEqual('GET');
  });

  it('should check authorization with backend', () => {
    service.checkUser().subscribe();
    const req = httpTestingController.expectOne(service.baseUrl + "auth/github/check-usertype");
    expect(req.request.method).toEqual('GET');
  });

  it('should set user', () => {
    service.setUser(1);
    expect(service.user).toEqual(1);
  });

  it('should start scooter', () => {
    service.putStart(1);
    const req = httpTestingController.expectOne(service.baseUrl + "scooters/1");
    expect(req.request.method).toEqual('PUT');
  });

  it('should park scooter', () => {
    service.putPark(1, 3, 58.0, 13.0, "charge");
    let req = httpTestingController.expectOne(service.baseUrl + "scooters/1");
    expect(req.request.method).toEqual('PUT');

    service.putPark(1, 3, 58.0, 13.0, "park");
    req = httpTestingController.expectOne(service.baseUrl + "scooters/1");
    expect(req.request.method).toEqual('PUT');
  });

  it('should street park scooter', () => {
    service.putStreetPark(1);
    let req = httpTestingController.expectOne(service.baseUrl + "scooters/1");
    expect(req.request.method).toEqual('PUT');
  });

});
