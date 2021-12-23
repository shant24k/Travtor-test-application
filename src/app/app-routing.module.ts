import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsSearchComponent } from './cars-search/cars-search.component';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { HotelsSearchComponent } from './hotels-search/hotels-search.component';
import { CruisesSearchComponent } from './cruises-search/cruises-search.component';
import { CarsResultsComponent } from './cars-results/cars-results.component';

const routes: Routes = [
  { path: '', redirectTo: 'cars-search', pathMatch: 'full' },
  { path: 'cars-search', component: CarsSearchComponent },
  { path: 'flights-search', component: FlightsSearchComponent },
  { path: 'hotels-search', component: HotelsSearchComponent },
  { path: 'cruises-search', component: CruisesSearchComponent },
  { path: 'cars-results', component: CarsResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
