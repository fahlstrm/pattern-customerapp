import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SCTR';
  auth = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.checkClick()
  }

  checkClick(): void {
    this.httpService.checkUser()
    .subscribe((res) => {
      if (res.user_type == "customer") {
        this.httpService.setUser(res.id);
        this.auth = true;
      }
    });
  }

  loginClick(): void {
    this.auth = !this.auth;
  }
}