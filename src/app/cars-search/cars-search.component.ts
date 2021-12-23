import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';
import { CarAddItemAction, CarsAddItemAction } from '../store/action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.scss']
})
export class CarsSearchComponent implements OnInit {

  date = new FormControl(new Date());

  constructor(private carsService: CarsService, private router: Router, private store: Store) { }

  myform!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  pickUpLocation!: FormControl;
  pickUpDate!: FormControl;
  dropOffDate!: FormControl;
  pickUpTime!: FormControl;
  dropOffTime!: FormControl;
  ageOfDriver!: FormControl;


  ngOnInit() {
    this.createFormControls();
    this.createForm();
    sessionStorage.removeItem('selectedCar');
    this.store.dispatch(new CarAddItemAction(null));
  }

  createFormControls() {
    this.pickUpLocation = new FormControl('', Validators.required);
    this.pickUpDate = new FormControl('', Validators.required);
    this.dropOffDate = new FormControl('', Validators.required);
    this.pickUpTime = new FormControl('', Validators.required);
    this.dropOffTime = new FormControl('', Validators.required);
    this.ageOfDriver = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      pickUpLocation: this.pickUpLocation,
      pickUpDate: this.pickUpDate,
      dropOffDate: this.dropOffDate,
      pickUpTime: this.pickUpTime,
      dropOffTime: this.dropOffTime,
      ageOfDriver: this.ageOfDriver,
    });
  }

  getCarsResults() {
    this.carsService.search().subscribe((response) => {
      if (response) {
        sessionStorage.setItem('selectedCar', JSON.stringify(this.myform.value));
        this.store.dispatch(new CarAddItemAction(this.myform.value));
        this.store.dispatch(new CarsAddItemAction(response));
        this.router.navigate(['/cars-results'])
      }
    });
  }

}
