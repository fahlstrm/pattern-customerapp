import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SCTR';
  auth = false;

  loginClick() {
    this.auth = !this.auth;
    console.log(this.auth);
  }
}