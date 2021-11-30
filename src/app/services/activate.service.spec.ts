import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { ActivateService } from './activate.service';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('true')
    };
  }
};

describe('ActivateService', () => {
  let service: ActivateService;
  let dialog: MatDialogMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientTestingModule, BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialog, useClass: MatDialogMock
        }
      ]
    });
    service = TestBed.inject(ActivateService);
    dialog = TestBed.get(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    service.openSnackbar();
  })

  it('should open and close park dialog', () => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of('true')});

    service.parkClick(1, 58.0, 13.0, "Elins esplanad", "park");

    expect(dialog.open).toHaveBeenCalled();
    expect(service.openSnackbar).toHaveBeenCalled;
    expect(service.toggleActive).toHaveBeenCalled;
    }
  );

  it('should open and close start dialog', () => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of('true')});

    service.markerClick(1, 45);

    expect(dialog.open).toHaveBeenCalled();
    expect(service.openSnackbar).toHaveBeenCalled;
    expect(service.toggleActive).toHaveBeenCalled;
    }
  );

  it('should open and close end dialog', () => {
    spyOn(dialog, 'open').and.returnValue({afterClosed: () => of('true')});

    service.endClick();

    expect(dialog.open).toHaveBeenCalled();
    expect(service.openSnackbar).toHaveBeenCalled;
    expect(service.toggleActive).toHaveBeenCalled;
    }
  );

});
