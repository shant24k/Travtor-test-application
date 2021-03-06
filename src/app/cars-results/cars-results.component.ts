import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCarSearch, getCarItineraries } from '../store/store-selector';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CarsService } from '../services/cars.service';
import { CarAddItemAction, CarsAddItemAction } from '../store/action';
import { propertyMap, orderMap, getKeyValue } from '../models/constants';

@Component({
  selector: 'app-cars-results',
  templateUrl: './cars-results.component.html',
  styleUrls: ['./cars-results.component.scss'],
})
export class CarsResultsComponent implements OnInit {

  selectedCar: any = null;
  ObjPropName: string = '';
  OrderByType: boolean = false;
  getCarItineraries: any;
  totalDays: number = 23;
  sortByProp!: FormControl;
  sortForm!: FormGroup;
  constructor(private store: Store, private router: Router, private carsService: CarsService) { 
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
    this.sortByProp = new FormControl('');
    this.sortForm = new FormGroup({
      sortByProp: this.sortByProp
    });
    let selectedCarStr = sessionStorage.getItem('selectedCar');
    if (selectedCarStr) {
      this.selectedCar = JSON.parse(selectedCarStr);
    }
    if (!this.getCarItineraries && this.selectedCar) {
      this.getCarsResults();
    }
    this.totalDays = 23;
    if (!this.selectedCar) {
      this.router.navigate(['/cars-search'])
    }
  }

  applySort() {
    if (this.sortByProp.value) {
      let propArr = this.sortByProp.value.split('-');
      this.ObjPropName = getKeyValue(propertyMap, propArr[0]);
      this.OrderByType = getKeyValue(orderMap, propArr[1]);
      this.sortForm.reset();
    }
  }

  getCarsResults() {
    this.carsService.search().subscribe((response) => {
      if (response) {
        this.store.dispatch(new CarAddItemAction(this.selectedCar));
        this.store.dispatch(new CarsAddItemAction(response));
      }
    });
  }
}
