import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn = false;

  @Output() loginEvent = new EventEmitter()

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  loginClick() {
    this.httpService.githubRedirect()
    .subscribe((res) => {
      console.log(res.login_url);
      this.loggedIn = !this.loggedIn;
      window.open(res.login_url);
    })
  }

  checkClick() {
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
