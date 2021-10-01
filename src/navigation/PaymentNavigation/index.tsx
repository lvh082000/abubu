import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectPaymentAccountParams} from 'types/Params';
import {PaymentMethodType} from 'types/Properties';
export enum PaymentScreenID {
  AddPaymentAccount = 'Payment_AddPaymentAccount',
  SelectPaymentAccount = 'Payment_SelectPaymentAccount',
}

export type PaymentStackParams = {
  [PaymentScreenID.AddPaymentAccount]: {type: PaymentMethodType};
  [PaymentScreenID.SelectPaymentAccount]: SelectPaymentAccountParams;
};

const PaymentStack = createStackNavigator<PaymentStackParams>();

const PaymentNavigation = () => {
  return (
    <PaymentStack.Navigator
      initialRouteName={PaymentScreenID.SelectPaymentAccount}
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <PaymentStack.Screen
        name={PaymentScreenID.SelectPaymentAccount}
        getComponent={() =>
          require('../../screens/Payment/SelectPaymentAccount').default
        }
      />
      <PaymentStack.Screen
        name={PaymentScreenID.AddPaymentAccount}
        getComponent={() =>
          require('../../screens/Payment/AddPaymentAccount').default
        }
      />
    </PaymentStack.Navigator>
  );
};

export default PaymentNavigation;
