import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
  searchedLocation: string;
  propertyTitle: string;
  description: string;
  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchedLocation = this.locationService.searchedAddress$.value;
  }

  handleAddressChange(address: any) {
    this.searchedLocation = address.formatted_address;
  }

  post() {
    console.log(this.searchedLocation);
    this.locationService.setSearchedAddress(this.searchedLocation);
    // this.locationService.setIsPlaceSelected(true);
    this.locationService
      .getLocationFromAddress(this.searchedLocation)
      .subscribe((location) => {
        this.locationService.addMarkedLocation(location);
      });
    this.router.navigate(['/page1']);
  }
}
