import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCarSearch, getCarItineraries } from '../store/store-selector';
import { Router } from '@angular/router';
import { RouterEventService } from '../services/router-event.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  selectedCar: any;
  getCarItineraries: any;
  url: any;

  constructor(private store: Store, private router: Router, private routerEventService: RouterEventService) { 
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
    this.routerEventService.subscribeToRouterEvent().subscribe((event) => {
      if (event.url) {
        this.url = event.url;
        if (this.url.indexOf('car') === -1 && (this.selectedCar || this.getCarItineraries)) {
          this.selectedCar = null;
          this.getCarItineraries = null;
        }
      }
    });
  }

}
