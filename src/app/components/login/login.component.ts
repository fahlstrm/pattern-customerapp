import { Component, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loggedIn = false;

  @Output() loginEvent = new EventEmitter()

  constructor(private httpService: HttpService) { }

  loginClick(): void {
    this.httpService.githubRedirect()
    .subscribe((res) => {
      console.log(res.login_url);
      this.loggedIn = !this.loggedIn;
      window.open(res.login_url);
    })
  }

  checkClick(): void {
    this.httpService.checkUser()
    .subscribe((res) => {
      console.log(res);
      if (res.user_type == "customer") {
        this.httpService.setUser(res.id);
        this.loginEvent.emit("clicked");
      }
    })
  }
}
