import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState, Store} from 'store';

const selectSelf = (state: RootState) => state;

export const OtherRevenuesSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.order.otherRevenues;
  });

export const GetIsMetaDataLoaded = () => {
  return Store.getState().order.isMetaDataLoaded;
};

export const BankAccountsSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.order.bankAccounts;
  });

export const RoomsSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.order.rooms;
  });

export const GetBankAccounts = () => {
  return Store.getState().order.bankAccounts;
};
