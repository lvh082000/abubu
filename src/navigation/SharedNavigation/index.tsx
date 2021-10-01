import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {SelectSharedItemType, SelectSharedPersonType} from 'types/Properties';

export enum SharedScreenID {
  SelectItem = 'Shared_SelectItem',
  SelectPerson = 'Shared_SelectPerson',
}

export type SharedStackParams = {
  [SharedScreenID.SelectItem]: {
    value: string;
    type: SelectSharedItemType;
  };
  [SharedScreenID.SelectPerson]: {
    value: string;
    type: SelectSharedPersonType;
  };
};

const SharedStack = createStackNavigator<SharedStackParams>();

const SharedNavigation = () => {
  return (
    <SharedStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <SharedStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={SharedScreenID.SelectItem}
        getComponent={() => require('../../screens/Shared/SelectItem').default}
      />
      <SharedStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name={SharedScreenID.SelectPerson}
        getComponent={() =>
          require('../../screens/Shared/SelectPerson').default
        }
      />
    </SharedStack.Navigator>
  );
};

export default SharedNavigation;
