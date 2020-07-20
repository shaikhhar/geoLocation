import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  isPlaceSelected$ = new BehaviorSubject<boolean>(false);

  searchedAddress$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  setSearchedAddress(address: string) {
    this.searchedAddress$.next(address);
  }

  getSearchedAddress() {
    return this.searchedAddress$.asObservable();
  }

  setIsPlaceSelected(value: boolean) {
    this.isPlaceSelected$.next(value);
  }

  getIsPlaceSelected() {
    return this.isPlaceSelected$.asObservable();
  }

  getLocationDefault() {
    return this.http
      .get<ILocation>(
        'http://api.ipapi.com/api/check?access_key=a1b56d2b0228ecf75cd39382f4efe1bb'
      )
      .pipe(
        map((locationObject) => {
          return {
            lat: locationObject.latitude,
            lng: locationObject.longitude,
          };
        })
      );
  }

  getLocationFromAddress(address: string) {
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDP92SuquMXgdjz1VrPTg7JY5lkC4PYMXI`
      )
      .pipe(
        map((data: any) => {
          return data.results[0].geometry.location;
        })
      );
  }

  getLocation(address?: string) {
    if (address === null) {
      return this.getLocationDefault();
    } else {
      return this.getLocationFromAddress(address);
    }
  }

  getAddress(lat, lng): Observable<string> {
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
