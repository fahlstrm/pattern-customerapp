import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpService } from './services/http.service';

describe('AppComponent', () => {
  let serviceStub: any;

  beforeEach(async () => {
    serviceStub = {
      checkUser: () => of({"user_type":"customer","id":"1"}),
      setUser: () => of()
    }
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ {provide: HttpService, useValue: serviceStub }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SCTR'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SCTR');
  });

  it('should change auth variable on function call', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const oldAuth = app.auth;
    app.loginClick();
    expect(app.auth).not.toEqual(oldAuth);
  });

  it('should return user type on login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.auth = false;
    fixture.detectChanges();
    app.checkClick();
    expect(app.auth).toBeTruthy();
  });
});
