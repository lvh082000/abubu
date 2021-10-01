import {RootState, Store} from 'store';

const selectSelf = (state: RootState) => state;

export const IsAuth = () => {
  const auth = Store.getState().authentication;
  return !!auth.accessToken;
};

export const GetAuthentication = () => {
  return Store.getState().authentication;
};
