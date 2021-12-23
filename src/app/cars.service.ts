import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) {}

  search(): Observable<any> {
    let apiURL = '/assets/carMockItineraries.json';
    return this.http.get(apiURL);
  }

}