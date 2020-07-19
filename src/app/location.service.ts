import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ILocation {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  placeSelected$ = new BehaviorSubject<boolean>(false);

  searchedLocation$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  setSearchedLocation(searchedLocation: string) {
    this.searchedLocation$.next(searchedLocation);
  }

  setPlaceSelected(value: boolean) {
    this.placeSelected$.next(value);
  }

  isPlaceSelected() {
    return this.placeSelected$.asObservable();
  }

  getLocation() {
    return this.http.get<ILocation>(
      'http://api.ipapi.com/api/check?access_key=a1b56d2b0228ecf75cd39382f4efe1bb'
    );
  }

  getLatLng(address: string) {
    const add = address.replace(',', '+').replace(' ', '+').replace(' ', '');
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=AIzaSyDP92SuquMXgdjz1VrPTg7JY5lkC4PYMXI`
      )
      .pipe(
        map((data: any) => {
          return data.results[0].geometry.location;
        })
      );
  }

  getAddress(lat, lng) {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=AIzaSyDP92SuquMXgdjz1VrPTg7JY5lkC4PYMXI`
      )
      .pipe(
        map((data: any) => {
          return data.results[0].formatted_address;
        })
      );
  }
}
