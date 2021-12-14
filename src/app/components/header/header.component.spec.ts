import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';
import { CityService } from 'src/app/services/city.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let serviceStub: any;
  let activateStub: any;

  beforeEach(async () => {
    serviceStub = {
      getCities: () => of([{"id":1, "name": "Uppsala"}]),
      setCity: () => of()
    }
    activateStub = {
      endClick: () => of(),
      onToggle: () => of(true)
    }

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MatDialogModule, MatSnackBarModule, HttpClientTestingModule ],
      providers: [ {provide: CityService, useValue: serviceStub }, {provide: ActivateService, useValue: activateStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Button should park', () => {
    component.scooterActive = true;
    fixture.detectChanges();
    const onClickMock = spyOn(component, 'endClick');
    fixture.debugElement.query(By.css('.end')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should get cities on init', () => {
    expect(component.cities).toContain({"id":1, "name": "Uppsala"})
  });

  it('should change city on menu click', () => {
    spyOn(component, 'changeCity').withArgs(1);
    fixture.debugElement.query(By.css('.item')).triggerEventHandler('click', null);
    expect(component.changeCity).toHaveBeenCalled();
  });

  it('should start timer', () => {
    component.scooterActive = true;
    fixture.detectChanges();
    let spy = spyOn(component, 'startTimer');
    component.startTimer();
    expect(spy).toHaveBeenCalled();
  });

  it('should end timer', () => {
    component.time = 5;
    fixture.detectChanges();
    component.endTimer();
    expect(component.time).toEqual(0);
  });

});
