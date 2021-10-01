import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState, Store} from 'store';

const selectSelf = (state: RootState) => state;

export const ReceiptTypesSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.cashbook.types;
  });

export const GetIsMetaDataLoaded = () => {
  return Store.getState().cashbook.isMetaDataLoaded;
};
