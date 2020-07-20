import { Component, OnInit } from '@angular/core';
import { LocationService, ILocation } from 'src/app/location.service';
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
  searchedAddress: string = null;
  markedLocation: ILocation[];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    console.log('init searchedPlace ', this.searchedAddress);
    console.log('init markedPlace', this.markedLocation);
    this.locationService.getMarkedLocation().subscribe((markedLocations) => {
      this.markedLocation = markedLocations;
    });

    this.locationService.getIsPlaceSelected().subscribe((isSelected) => {
      this.placeSelected = isSelected;
    });
    this.locationService.getSearchedAddress().subscribe((address) => {
      this.searchedAddress = address;
    });
    this.locationService
      .getLocation(this.searchedAddress)
      .subscribe((locationObject) => {
        this.lat = locationObject.lat;
        this.lng = locationObject.lng;
      });
  }

  search() {
    console.log(this.searchedAddress);
    this.locationService
      .getLocation(this.searchedAddress)
      .subscribe((latlng) => {
        console.log('latlng', latlng);
        this.lat = latlng.lat;
        this.lng = latlng.lng;
        this.locationService.setIsPlaceSelected(true);
        this.locationService.setSearchedAddress(this.searchedAddress);
        this.locationService.addMarkedLocation(latlng);
        this.zoom = 15;
      });
  }

  public handleAddressChange(address: any) {
    this.searchedAddress = address.formatted_address;
  }

  onChosenPlace(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationService.getAddress(this.lat, this.lng).subscribe((address) => {
      console.log(address);
      this.searchedAddress = address;
      this.locationService.setIsPlaceSelected(true);
      this.locationService.setSearchedAddress(address);
      this.locationService.addMarkedLocation(event.coords);
    });
  }

  post() {
    console.log(this.searchedAddress);
    this.locationService.setSearchedAddress(this.searchedAddress);
    this.router.navigate(['/page2']);
  }
}
