import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  title = 'My first AGM project';
  lat = 0;
  lng = 0;
  zoom = 15;
  placeSelected: boolean;
  locationSub: Subscription;
  searchedLocation: string;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService
      .isPlaceSelected()
      .subscribe((isPlaceSelected) => (this.placeSelected = isPlaceSelected));
    this.locationService.searchedLocation$.subscribe((place) => {
      if (place) {
        this.locationService.getLatLng(place).subscribe((latlng) => {
          this.lat = latlng.lat;
          this.lng = latlng.lng;
          this.locationService.setPlaceSelected(true);
        });
      } else {
        this.locationSub = this.locationService
          .getLocation()
          .subscribe((place) => {
            this.lat = place.latitude;
            this.lng = place.longitude;
          });
      }
    });
  }

  search() {
    console.log(this.searchedLocation);
    this.locationService
      .getLatLng(this.searchedLocation)
      .subscribe((latlng) => {
        console.log('latlng', latlng);
        this.lat = latlng.lat;
        this.lng = latlng.lng;
        this.locationService.setPlaceSelected(true);
        this.zoom = 15;
      });
  }

  public handleAddressChange(address: any) {
    this.searchedLocation = address.formatted_address;
  }

  onChosenPlace(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationService.getAddress(this.lat, this.lng).subscribe((address) => {
      console.log(address);
      this.searchedLocation = address;
    });
    this.locationService.setPlaceSelected(true);
  }

  post() {
    this.locationService.setSearchedLocation(this.searchedLocation);
    this.router.navigate(['/page2']);
  }
}
