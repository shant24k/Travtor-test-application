import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';
import { RouterEventService } from '../services/router-event.service';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let routerEventService: RouterEventService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [ NavBarComponent ],
      providers: [ RouterEventService ]
    })
    .compileComponents();
    routerEventService = TestBed.inject(RouterEventService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should check the route events', () => {
    spyOn(routerEventService, 'subscribeToRouterEvent').and.returnValue(of({url: 'http://localhost:4200/car-search'}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.url).toEqual('http://localhost:4200/car-search');
  });

  it('ngOnInit should check the route events and accordingly update local objects', () => {
    spyOn(routerEventService, 'subscribeToRouterEvent').and.returnValue(of({url: 'http://localhost:4200/flights-search'}));
    component.selectedCar = {
      pickUpLocation: 'Airport',
      pickUpDate: '2021-12-30',
      dropOffDate: '2022-01-01',
      pickUpTime: '09:00',
      dropOffTime: '19:00',
      ageOfDriver: '25+'
    };
    component.getCarItineraries = {
      currency: 'USD',
      carItinerraies: {}
    }
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.url).toEqual('http://localhost:4200/flights-search');
    expect(component.selectedCar).toBeFalsy();
    expect(component.getCarItineraries).toBeFalsy();
  });
});
