import { Action, UPDATE } from '@ngrx/store';
import { CarsActionType } from './action';
const initialState: any = [
  {
    carSearch: null,
  },
];
interface AppAction extends Action {
  type: string,
  payload?: any,
  upload?: any
}
export class UpdateAction implements Action {
  readonly type = UPDATE;
  readonly payload = null;
  readonly upload = null;

}
export function appReducer(
  state: any = initialState,
  action: AppAction | UpdateAction
) {
  switch (action.type) {
    case CarsActionType.ADD_CAR:
      return {...state, carSearch: action.payload};
    case CarsActionType.ADD_CARS:
      return {...state, carItineraries: action.payload};
    default:
      return state;
  }
}