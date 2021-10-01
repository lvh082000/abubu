import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState, Store} from 'store';

const selectSelf = (state: RootState) => state;

export const CategoriesSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.product.categories;
  });

export const BrandsSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.product.brands;
  });

export const LocationsSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.product.locations;
  });

export const PropertiesSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.product.properties;
  });

export const PricesSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.product.prices;
  });

export const GetIsMetaDataLoaded = () => {
  return Store.getState().product.isMetaDataLoaded;
};
