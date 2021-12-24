import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarsSearchComponent } from './cars-search.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { CarAddItemAction, CarsAddItemAction } from '../store/action';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { appReducer } from '../store/reducer';
import { routes } from '../cars-results/cars-results.component.spec';
import { of } from 'rxjs/internal/observable/of';
import { car_list } from '../car-itineraries';
import { Router } from '@angular/router';

describe('CarsSearchComponent', () => {
  let component: CarsSearchComponent;
  let fixture: ComponentFixture<CarsSearchComponent>;
  let carsService: CarsService;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsSearchComponent ],
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
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should intialise component', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("getCarsResults should call carsService and return list of car teneraries and then redirect", waitForAsync(() => {
    spyOn(carsService, 'search').and.returnValue(of(car_list));
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');
    component.getCarsResults();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnceWith(['/cars-results']);
  }));  
});
