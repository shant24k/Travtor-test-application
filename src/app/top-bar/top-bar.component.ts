import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCarSearch, getCarItineraries } from '../store/store-selector';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  selectedCar: any;
  getCarItineraries: any;

  constructor(private store: Store) { 
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
  }

}
