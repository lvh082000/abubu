import HttpService from 'services/HttpService';
import {
  FetchLoginParams,
  FetchRegisterParams,
  ChangePasswordParams,
  FetchResetPasswordParams,
} from 'types/Params';
import {FetchLoginResponse} from 'types/Responses/FetchLoginResponse';
import {FetchRegisterResponse} from 'types/Responses/FetchRegisterResponse';
import {FetchChangePasswordResponse} from 'types/Responses/FetchChangePasswordResponse';

const fetchLogin = async (values: FetchLoginParams) => {
  return await HttpService.Post<FetchLoginResponse>('/public/auth/login', {
    username: values.email,
    password: values.password,
    firebaseToken: '123456',
  });
};

const fetchRegister = async (values: FetchRegisterParams) => {
  return await HttpService.Post<FetchRegisterResponse>('/public/auth/sign-up', {
    fullName: values.fullName,
    username: values.email,
    password: values.password,
    firebaseToken: '123456',
  });
};

const fetchSendOTPCode = async (username: string) => {
  return await HttpService.Post('/public/auth/forgot-password', {username});
};

const fetchVerifyOTP = async (phone: string, opt: string) => {
  return HttpService.Post('/public/auth/verify-otp', {
    username: phone,
    OTP: opt,
  });
};

const changePassword = async (values: ChangePasswordParams) => {
  return await HttpService.Post<FetchChangePasswordResponse>(
    '/me/profile/change-password',
    {
      password: values.password,
      newPassword: values.newPassword,
    },
  );
};

const fetchResetPassword = async (values: FetchResetPasswordParams) => {
  return await HttpService.Post('/public/auth/sign-up', {
    username: values.username,
    password: values.password,
    OTP: values.otp,
    firebaseToken: '123123',
  });
};

export const AuthenticationService = {
  fetchLogin,
  fetchRegister,
  changePassword,
  fetchSendOTPCode,
  fetchVerifyOTP,
  fetchResetPassword,
};
