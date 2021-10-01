import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';
import {NavigationTabBar} from 'components/MyTabBar';
import LazyCustomers from './components/LazyCustomers';
import LazyProviders from './components/LazyProviders';
import {PartnerType} from 'types/Properties';

export enum PartnerTabScreenID {
  Customers = 'PartnerTabScreen_Customers',
  Providers = 'PartnerTabScreen_Providers',
}

export enum PartnerScreenID {
  PartnerDetails = 'PartnerScreen_PartnerDetails',
  CreatePartner = 'PartnerScreen_CreatePartner',
}

export type PartnerStackParams = {
  [PartnerScreenID.PartnerDetails]: {id: number};
  [PartnerScreenID.CreatePartner]: {type: PartnerType; useBack?: boolean};
};

const PartnerStack = createStackNavigator<PartnerStackParams>();

export const PartnerNavigation = () => {
  return (
    <PartnerStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <PartnerStack.Screen
        name={PartnerScreenID.PartnerDetails}
        getComponent={() =>
          require('../../screens/Partner/PartnerDetails').default
        }
      />
      <PartnerStack.Screen
        name={PartnerScreenID.CreatePartner}
        getComponent={() =>
          require('../../screens/Partner/CreatePartner').default
        }
      />
    </PartnerStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const PartnerTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{swipeEnabled: false}}
      tabBar={props => <NavigationTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarShowIcon: true,
          title: 'Khách hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.fontAwesome}
                name="user"
              />
            );
          },
        }}
        name={PartnerTabScreenID.Customers}
        component={LazyCustomers}
      />
      <Tab.Screen
        options={{
          title: 'Nhà cung cấp',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.fontAwesome}
                name="users"
              />
            );
          },
        }}
        name={PartnerTabScreenID.Providers}
        component={LazyProviders}
      />
    </Tab.Navigator>
  );
};

export default PartnerNavigation;
