import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarsResultsComponent } from './cars-results.component';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { CarsService } from '../services/cars.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { of } from 'rxjs/internal/observable/of';
import { car_list } from '../car-itineraries';
import { TopBarComponent } from '../top-bar/top-bar.component'
import { NavBarComponent } from '../nav-bar/nav-bar.component'
import { appReducer } from '../store/reducer';
import { Routes } from '@angular/router';
import { CarsSearchComponent } from '../cars-search/cars-search.component';
import { FlightsSearchComponent } from '../flights-search/flights-search.component';
import { HotelsSearchComponent } from '../hotels-search/hotels-search.component';
import { CruisesSearchComponent } from '../cruises-search/cruises-search.component';
import { FormControl } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: '/cars-search', pathMatch: 'full' },
  { path: 'cars-search', component: CarsSearchComponent },
  { path: 'flights-search', component: FlightsSearchComponent },
  { path: 'hotels-search', component: HotelsSearchComponent },
  { path: 'cruises-search', component: CruisesSearchComponent },
  { path: 'cars-results', component: CarsResultsComponent },
  { path: '**', redirectTo: '/cars-search', pathMatch: 'full' }
];

describe('CarsResultsComponent', () => {
  let component: CarsResultsComponent;
  let fixture: ComponentFixture<CarsResultsComponent>;
  let carsService: CarsService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsResultsComponent, OrderByPipe, TopBarComponent, NavBarComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({}),
        StoreModule.forFeature('app', appReducer),
        HttpClientModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      })],
      providers: [CarsService]
    })
    .compileComponents();
    carsService = TestBed.inject(CarsService);
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("getCarsResults should call carsService and return list of car teneraries", waitForAsync(() => {
    spyOn(carsService, 'search').and.returnValue(of(car_list));
    spyOn(store, 'dispatch');
    component.getCarsResults();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  }));

  it("applySort should not apply sorting if not opted by user", waitForAsync(() => {
    component.sortByProp = new FormControl('');
    component.applySort();
    fixture.detectChanges();
    expect(component.ObjPropName).toBeFalsy();
    expect(component.OrderByType).toBeFalsy();
  }));

  it("applySort should apply sorting by selected field", waitForAsync(() => {
    component.sortByProp.setValue('price-dsc');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log("component.sortByProp: ", component.sortByProp.value);
      component.applySort();
      expect(component.ObjPropName).toEqual('fare.perDay');
      expect(component.OrderByType).toBeTrue();
    });
  }));

  it('ngOnInit should initialise component', () => {
    let selectedCar = {
      pickUpLocation: 'Airport',
      pickUpDate: '2021-12-30',
      dropOffDate: '2022-01-01',
      pickUpTime: '09:00',
      dropOffTime: '19:00',
      ageOfDriver: '25+'
    };
    sessionStorage.setItem('selectedCar', JSON.stringify(selectedCar));
    spyOn(component, 'getCarsResults');
    component.ngOnInit();
    expect(component.getCarsResults).toHaveBeenCalled();
    sessionStorage.removeItem('selectedCar');
  });
});
