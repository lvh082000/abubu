import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {RootStackParams, RootScreenID} from './types';
import NavigationService from 'services/NavigationService';
import {useSpinnerState} from 'components/Spinner';
import Intro from 'screens/Intro';
import {IsAuth} from 'store/Authentication';

const RootStack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  const isVisible = useSpinnerState();
  const isAuth = IsAuth();

  const listeners = useMemo(() => {
    return {
      beforeRemove: (e: any) => {
        if (!isVisible) {
          return;
        }
        e.preventDefault();
      },
    };
  }, [isVisible]);

  return (
    <NavigationContainer
      onStateChange={state => NavigationService.onStateChange(state)}
      ref={ref => (NavigationService.navigator = ref)}>
      <RootStack.Navigator
        initialRouteName={isAuth ? RootScreenID.MainDrawer : RootScreenID.Intro}
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <RootStack.Screen
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
          name={RootScreenID.Intro}
          component={Intro}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Auth}
          getComponent={() => require('./AuthNavgation').default}
          listeners={listeners}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.SelectShop}
          getComponent={() => require('../screens/SelectShop').default}
          listeners={listeners}
        />

        <RootStack.Screen
          name={RootScreenID.MainDrawer}
          getComponent={() => require('./MainDrawer').default}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forScaleFromCenterAndroid,
          }}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Setting}
          getComponent={() => require('./SettingNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Product}
          getComponent={() => require('./ProductNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Transaction}
          getComponent={() => require('./TransactionNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.QRCodeScanner}
          getComponent={() => require('../screens/QRCodeScanner').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Payment}
          getComponent={() => require('./PaymentNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.OtherRevenue}
          getComponent={() => require('./OtherRevenueNavigation').default}
        />
        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Partner}
          getComponent={() => require('./PartnerNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.EmployeeManagement}
          getComponent={() => require('./EmployeeManagementNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.CashBook}
          getComponent={() => require('./CashBookNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Report}
          getComponent={() => require('./ReportNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Shared}
          getComponent={() => require('./SharedNavigation').default}
        />

        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.PhotoViewer}
          getComponent={() => require('../screens/PhotoViewer').default}
        />
        <RootStack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={RootScreenID.Notification}
          getComponent={() => require('../screens/Notification').default}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
