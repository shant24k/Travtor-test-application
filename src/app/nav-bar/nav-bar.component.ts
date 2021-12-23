import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCarSearch, getCarItineraries } from '../store/store-selector';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  selectedCar: any;
  getCarItineraries: any;
  url: any;

  constructor(private store: Store, private router: Router) { 
    this.store.pipe(select(getCarSearch)).subscribe((getCarSearch) => {
      this.selectedCar = getCarSearch;
    });
    this.store.pipe(select(getCarItineraries)).subscribe((getCarItineraries) => {
      this.getCarItineraries = getCarItineraries;
    });
  }

  ngOnInit(): void {
    console.log(this.selectedCar);
    console.log(this.getCarItineraries);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url) {
        this.url = event.url;
      }
    });
  }

}
