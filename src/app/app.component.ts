import { Component } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SCTR';
  auth = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.checkClick()
    console.log("checked click")
  }

  checkClick() {
    this.httpService.checkUser()
    .subscribe((res) => {
      console.log(res);
      if (res.user_type == "customer") {
        this.httpService.setUser(res.id);
        this.auth = true;
      };
    });
  }

  loginClick() {
    this.auth = !this.auth;
    console.log(this.auth);
  }
}