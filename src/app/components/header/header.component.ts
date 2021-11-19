import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cities!: Array<any>;
  scooterActive!: boolean;
  subscription: Subscription;

  constructor(private activateService: ActivateService, private cityService: CityService) {
    this.subscription = this.activateService.onToggle()
    .subscribe(value => this.scooterActive = value);
  }

  ngOnInit(): void {
    this.cityService.getCities()
    .subscribe((data) => {
      this.cities = data;
    })
  }

  changeCity(city: any) {
    this.cityService.setCity(city);
  }

  endClick() {
    this.activateService.endClick();
  }

}
