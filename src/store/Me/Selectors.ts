import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState, Store} from 'store';

const selectSelf = (state: RootState) => state;

export const GetProfile = () => {
  return Store.getState().me.profile;
};

export const GetMyStores = () => {
  return Store.getState().me.profile?.stores ?? [];
};

export const GetCurrentStore = () => {
  return Store.getState().me.currentStore;
};

export const ProfileSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.me.profile;
  });

export const CurrentStoreSelector = () =>
  createDraftSafeSelector(selectSelf, state => {
    return state.me.currentStore;
  });
