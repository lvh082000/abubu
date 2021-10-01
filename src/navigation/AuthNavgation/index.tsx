import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

export enum AuthScreenID {
  Login = 'AuthScreen_Login',
  Register = 'AuthScreen_Register',
  EnterPhoneOrEmail = 'AuthScreen_EnterPhoneOrEmail',
  VerifyOTP = 'AuthScreen_VerifyOTP',
  ResetPassword = 'AuthScreen_ResetPassword',
}
export type AuthStackParams = {
  [AuthScreenID.VerifyOTP]: {
    phone: string;
  };
  [AuthScreenID.ResetPassword]: {
    phone: string;
    otp: string;
  };
};

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={AuthScreenID.Login}
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <AuthStack.Screen
        name={AuthScreenID.Login}
        getComponent={() => require('../../screens/Auth/Login').default}
      />

      <AuthStack.Screen
        name={AuthScreenID.Register}
        getComponent={() => require('../../screens/Auth/Register').default}
      />

      <AuthStack.Screen
        name={AuthScreenID.EnterPhoneOrEmail}
        getComponent={() =>
          require('../../screens/Auth/EnterPhoneOrEmail').default
        }
      />
      <AuthStack.Screen
        name={AuthScreenID.VerifyOTP}
        getComponent={() => require('../../screens/Auth/VerifyOTP').default}
      />
      <AuthStack.Screen
        name={AuthScreenID.ResetPassword}
        getComponent={() => require('../../screens/Auth/ResetPassword').default}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
