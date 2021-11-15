import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSnackbarComponent } from './finish-snackbar.component';

describe('FinishSnackbarComponent', () => {
  let component: FinishSnackbarComponent;
  let fixture: ComponentFixture<FinishSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
