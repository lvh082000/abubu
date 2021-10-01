import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export enum SettingScreenID {
  ProfileSetting = 'SettingScreen_ProfileSetting',
  ShopSetting = 'SettingScreen_ShopSetting',
  ManagementSetting = 'SettingScreen_ManagementSetting',
  NotificationSetting = 'SettingScreen_NotificationSetting',
  ChangePassword = 'SettingScreen_ChangePassword',
  DebtSetting = 'SettingScreen_DebtSetting',
  ShopsManagement = 'SettingScreen_ShopsManagement',
}

export type SettingStackParams = {
  [SettingScreenID.ProfileSetting]: undefined;
  [SettingScreenID.ShopSetting]: undefined;
  [SettingScreenID.NotificationSetting]: undefined;
  [SettingScreenID.ManagementSetting]: undefined;
  [SettingScreenID.ChangePassword]: undefined;
  [SettingScreenID.DebtSetting]: undefined;
  [SettingScreenID.ShopsManagement]: undefined;
};

const SettingStack = createStackNavigator<SettingStackParams>();

const SettingNavigation = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <SettingStack.Screen
        name={SettingScreenID.ProfileSetting}
        getComponent={() =>
          require('../../screens/Setting/ProfileSetting').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.ShopSetting}
        getComponent={() =>
          require('../../screens/Setting/ShopSetting').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.NotificationSetting}
        getComponent={() =>
          require('../../screens/Setting/NotificationSetting').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.ManagementSetting}
        getComponent={() =>
          require('../../screens/Setting/ManagementSetting').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.ChangePassword}
        getComponent={() =>
          require('../../screens/Setting/ChangePassword').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.DebtSetting}
        getComponent={() =>
          require('../../screens/Setting/DebtSetting').default
        }
      />
      <SettingStack.Screen
        name={SettingScreenID.ShopsManagement}
        getComponent={() =>
          require('../../screens/Setting/ShopsManagement').default
        }
      />
    </SettingStack.Navigator>
  );
};

export default SettingNavigation;
