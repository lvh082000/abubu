import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OtherRevenueType} from 'types/Properties';

export enum OtherRevenueScreenID {
  CreateOrUpdateOtherRevenue = 'OtherRevenue_CreateOrUpdateOtherRevenue',
  SelectOtherRevenues = 'OtherRevenue_SelectOtherRevenues',
}

export type OtherRevenueStackParams = {
  [OtherRevenueScreenID.CreateOrUpdateOtherRevenue]:
    | OtherRevenueType
    | undefined;
  [OtherRevenueScreenID.SelectOtherRevenues]:
    | {values: Array<number>}
    | undefined;
};

const OtherRevenueStack = createStackNavigator<OtherRevenueStackParams>();

const OtherRevenueNavigation = () => {
  return (
    <OtherRevenueStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <OtherRevenueStack.Screen
        name={OtherRevenueScreenID.SelectOtherRevenues}
        getComponent={() =>
          require('../../screens/OtherRevenue/SelectOtherRevenues').default
        }
      />
      <OtherRevenueStack.Screen
        name={OtherRevenueScreenID.CreateOrUpdateOtherRevenue}
        getComponent={() =>
          require('../../screens/OtherRevenue/CreateOrUpdateOtherRevenue')
            .default
        }
      />
    </OtherRevenueStack.Navigator>
  );
};

export default OtherRevenueNavigation;
