import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScootersService } from './scooters.service';

describe('ScootersService', () => {
  let service: ScootersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScootersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('gets parkings', () => {
  //   spyOn(ScootersService.prototype, 'getParkings').and.callThrough();
  //   service.getParkings();
  //   expect(service.getParkings).toHaveBeenCalled();
  // });
});
