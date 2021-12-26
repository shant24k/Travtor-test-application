import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CarsSearchComponent } from './cars-search/cars-search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { CruisesSearchComponent } from './cruises-search/cruises-search.component';
import { CarsResultsComponent } from './cars-results/cars-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarsService } from './services/cars.service';
import { appReducer } from './store/reducer';
import { OrderByPipe } from './pipes/order-by.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    CarsSearchComponent,
    NavBarComponent,
    TopBarComponent,
    FlightsSearchComponent,
    HotelsSearchComponent,
    CruisesSearchComponent,
    CarsResultsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
  }),
    StoreModule.forRoot({}, {})
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
