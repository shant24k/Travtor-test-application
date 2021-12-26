import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';
import { CarAddItemAction, CarsAddItemAction } from '../store/action';
import { Store } from '@ngrx/store';
import { ValidateDate, ValidatePickUpDropOffDate } from '../validators/date.validator';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.scss']
})
export class CarsSearchComponent implements OnInit {

  date = new FormControl(new Date());

  constructor(private carsService: CarsService, private router: Router, private store: Store) { }

  searchForm!: FormGroup;
  pickUpLocation!: FormControl;
  pickUpDate!: FormControl;
  dropOffDate!: FormControl;
  pickUpTime!: FormControl;
  dropOffTime!: FormControl;
  ageOfDriver!: FormControl;
  showLoader: boolean = false;


  ngOnInit() {
    this.createFormControls();
    this.createForm();
    sessionStorage.removeItem('selectedCar');
    this.store.dispatch(new CarAddItemAction(null));
    this.store.dispatch(new CarsAddItemAction(null));
  }

  createFormControls() {
    this.pickUpLocation = new FormControl('', Validators.required);
    this.pickUpDate = new FormControl('', [Validators.required, ValidateDate]);
    this.dropOffDate = new FormControl('', [Validators.required, ValidateDate]);
    this.pickUpTime = new FormControl('', Validators.required);
    this.dropOffTime = new FormControl('', Validators.required);
    this.ageOfDriver = new FormControl('', Validators.required);
  }

  createForm() {
    this.searchForm = new FormGroup({
      pickUpLocation: this.pickUpLocation,
      pickUpDate: this.pickUpDate,
      dropOffDate: this.dropOffDate,
      pickUpTime: this.pickUpTime,
      dropOffTime: this.dropOffTime,
      ageOfDriver: this.ageOfDriver,
    }, [ValidatePickUpDropOffDate]);
  }

  getCarsResults() {
    this.showLoader = true;
    this.carsService.search().subscribe((response) => {
      if (response) {
        sessionStorage.setItem('selectedCar', JSON.stringify(this.searchForm.value));
        this.store.dispatch(new CarAddItemAction(this.searchForm.value));
        this.store.dispatch(new CarsAddItemAction(response));
        this.router.navigate(['/cars-results']);
        this.showLoader = false;
      }
    });
  }

}
