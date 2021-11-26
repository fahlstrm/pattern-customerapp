import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateService } from './activate.service';

describe('ActivateService', () => {
  let service: ActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientTestingModule, BrowserAnimationsModule
      ]
    });
    service = TestBed.inject(ActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('opens snackbar', () => {
    spyOn(ActivateService.prototype, 'openSnackbar').and.callThrough();
    service.openSnackbar();
    expect(service.openSnackbar).toHaveBeenCalled();
  });

  it('togglesActive', () => {
    spyOn(ActivateService.prototype, 'toggleActive').and.callThrough();
    service.toggleActive();
    expect(service.toggleActive).toHaveBeenCalled();
  });
});
