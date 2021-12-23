import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAppState = createFeatureSelector<any>('app');

export const getCarSearch = createSelector(getAppState, state => state.carSearch);

export const getCarItineraries = createSelector(getAppState, state => state.carItineraries);