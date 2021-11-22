import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivateService } from './activate.service';

describe('ActivateService', () => {
  let service: ActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientTestingModule ]
    });
    service = TestBed.inject(ActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
