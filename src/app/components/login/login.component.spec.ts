import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {By} from "@angular/platform-browser";

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serviceStub: any;

  beforeEach(async () => {
    serviceStub = {
      githubRedirect: () => of({"login_url":"test.url"}),
      checkUser: () => of({"user_type":"customer","id":"1"}),
      setUser: () => of()
    }

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule],
      providers: [ {provide: HttpService, useValue: serviceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Login click button should trigger login function', () => {
    const onClickMock = spyOn(component, 'loginClick');
    fixture.debugElement.query(By.css('#loginClick')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('Check click button should trigger login function', () => {
    component.loggedIn = true;
    fixture.detectChanges();
    const onClickMock = spyOn(component, 'checkClick');
    fixture.debugElement.query(By.css('#checkClick')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should change auth variable on function call', () => {
    component.loggedIn = false;
    fixture.detectChanges();
    const oldAuth = component.loggedIn;
    component.loginClick();
    expect(component.loggedIn).not.toEqual(oldAuth);
  });

  it('should return user type on login', () => {
    spyOn(component.loginEvent, 'emit');
    component.checkClick();
    expect(component.loginEvent.emit).toHaveBeenCalledWith("clicked");
  });

});
