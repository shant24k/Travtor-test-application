import { Action } from '@ngrx/store';
export enum CarsActionType {
  ADD_CAR = '[CAR] Add Car',
  ADD_CARS = '[CAR] Add Cars Itineraries'
}

export class CarAddItemAction implements Action {
  readonly type = CarsActionType.ADD_CAR;
  constructor(public payload: any) {}
}
export type CarsAction = CarAddItemAction;

export class CarsAddItemAction implements Action {
  readonly type = CarsActionType.ADD_CARS;
  constructor(public payload: any) {}
}
export type CarsItinerariesAction = CarsAddItemAction;