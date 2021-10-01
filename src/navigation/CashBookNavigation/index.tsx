import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationTabBar} from 'components/MyTabBar';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';
import LazyBank from './components/LazyBank';
import LazyCash from './components/LazyCash';
import LazyTotalFund from './components/LazyTotalFund';
import {
  CreateOrUpdateCashBookParams,
  FetchCreateOrUpdateReceiptTypeParams,
} from 'types/Params';

export enum CashBookTabScreenID {
  Cash = 'CashBookTabScreen_Cash',
  Bank = 'CashBookTabScreen_Bank',
  TotalFund = 'CashBookTabScreen_TotalFund',
}

export enum CashBookScreenID {
  VoucherDetails = 'CashBookScreen_VoucherDetails',
  CreateOrUpdateCashBook = 'CashBookScreen_CreateOrUpdateCashBook',
  CreateOrUpdateReceiptType = 'CashBookScreen_CreateOrUpdateReceiptType',
}

export type CashBookStackParams = {
  [CashBookScreenID.VoucherDetails]: undefined;
  [CashBookScreenID.CreateOrUpdateCashBook]: CreateOrUpdateCashBookParams;
  [CashBookScreenID.CreateOrUpdateReceiptType]: FetchCreateOrUpdateReceiptTypeParams;
};

const CashBookStack = createStackNavigator<CashBookStackParams>();

export const CashBookNavigation = () => {
  return (
    <CashBookStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <CashBookStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={CashBookScreenID.VoucherDetails}
        getComponent={() =>
          require('../../screens/CashBook/VoucherDetails').default
        }
      />
      <CashBookStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={CashBookScreenID.CreateOrUpdateCashBook}
        getComponent={() =>
          require('../../screens/CashBook/CreateOrUpdateCashBook').default
        }
      />

      <CashBookStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={CashBookScreenID.CreateOrUpdateReceiptType}
        getComponent={() =>
          require('../../screens/CashBook/CreateOrUpdateReceiptType').default
        }
      />
    </CashBookStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const CashBookTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <NavigationTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarShowIcon: true,
          title: 'Tiền mặt',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.fontAwesome}
                name="sign-in"
              />
            );
          },
        }}
        name={CashBookTabScreenID.Cash}
        component={LazyCash}
      />
      <Tab.Screen
        options={{
          title: 'Ngân hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.material}
                name="calculate"
              />
            );
          },
        }}
        name={CashBookTabScreenID.Bank}
        component={LazyBank}
      />
      <Tab.Screen
        options={{
          title: 'Tổng quỹ',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.material}
                name="calculate"
              />
            );
          },
        }}
        name={CashBookTabScreenID.TotalFund}
        component={LazyTotalFund}
      />
    </Tab.Navigator>
  );
};

export default CashBookNavigation;
