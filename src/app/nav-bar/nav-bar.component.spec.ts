import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
// import { MockStore, getMockStore } from '@ngrx/store/testing';

import { NavBarComponent } from './nav-bar.component';
import { RouterEventService } from '../router-event.service';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let routerEventService: RouterEventService
  // let store: MockStore;
  // const initialState = { carSearch: null, carItineraries: null };

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
    // store = getMockStore({ initialState });
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

  it('ngOnInit should create', () => {
    spyOn(routerEventService, 'subscribeToRouterEvent').and.returnValue(of({url: 'http://localhost:4200/car-search'}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.url).toEqual('http://localhost:4200/car-search');
  });
});
