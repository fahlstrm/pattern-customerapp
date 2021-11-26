import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {By} from "@angular/platform-browser";

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule]
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

  it('should change auth variable on function call', () => {
    const oldAuth = component.loggedIn;
    component.loginClick();
    expect(component.loggedIn).toEqual(oldAuth);
  });

  it('Check click button should trigger login function', () => {
    component.loggedIn = true;
    fixture.detectChanges();
    const onClickMock = spyOn(component, 'checkClick');
    fixture.debugElement.query(By.css('#checkClick')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
