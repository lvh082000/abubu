import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthenticationService} from 'services/AuthenticationService';
import {
  FetchLoginParams,
  FetchRegisterParams,
  ChangePasswordParams,
} from 'types/Params';

export const LoginPrefix = '@Auth/Login';
export const LogoutPrefix = '@Auth/Logout';
export const RegisterPrefix = '@Auth/Register';
export const ChangePasswordPrefix = '@Auth/ChangePassword';

export const fetchLogin = createAsyncThunk(
  LoginPrefix,
  async (values: FetchLoginParams) => {
    return await AuthenticationService.fetchLogin(values);
  },
);

export const fetchRegister = createAsyncThunk(
  RegisterPrefix,
  async (values: FetchRegisterParams) => {
    return await AuthenticationService.fetchRegister(values);
  },
);

export const changePassword = createAsyncThunk(
  ChangePasswordPrefix,
  async (values: ChangePasswordParams) => {
    return await AuthenticationService.changePassword(values);
  },
);
