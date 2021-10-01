import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerScreenID} from 'navigation/types';
import React from 'react';
import Home from 'screens/Home';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={DrawerScreenID.Home}
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerType: 'front',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={DrawerScreenID.Home} component={Home} />

      <Drawer.Screen
        name={DrawerScreenID.Setting}
        getComponent={() =>
          require('../../screens/Setting/MainSetting').default
        }
      />
      <Drawer.Screen
        name={DrawerScreenID.Product}
        getComponent={() =>
          require('../../screens/Product/MainProduct').default
        }
      />
      <Drawer.Screen
        name={DrawerScreenID.Transaction}
        getComponent={() =>
          require('../../screens/Transaction/MainTransaction').default
        }
      />

      <Drawer.Screen
        name={DrawerScreenID.Partner}
        getComponent={() =>
          require('../../screens/Partner/MainPartner').default
        }
      />
      <Drawer.Screen
        name={DrawerScreenID.Report}
        getComponent={() => require('../../screens/Report/MainReport').default}
      />
      <Drawer.Screen
        name={DrawerScreenID.EmployeeManagement}
        getComponent={() =>
          require('../../screens/EmployeeManagement/MainEmployeeManagement')
            .default
        }
      />
      <Drawer.Screen
        name={DrawerScreenID.CashBook}
        getComponent={() =>
          require('../../screens/CashBook/MainCashBook').default
        }
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigation;
