import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationTabBar} from 'components/MyTabBar';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';
import LazyEmployees from './components/LazyEmployees';
import LazySalary from './components/LazySalary';

export enum EmployeeManagementTabScreenID {
  Employess = 'EmployeeManagementTabScreen_Employess',
  Salary = 'EmployeeManagementTabScreen_Salary',
}

export enum EmployeeManagementScreenID {
  EmployeeDetails = 'EmployeeManagementScreen_EmployeeDetails',
  CreatePayslip = 'EmployeeManagementScreen_CreatePayslip',
  CreateEmployee = 'EmployeeManagementScreen_CreateEmployee',
}

export type EmployeeManagementStackParams = {
  [EmployeeManagementScreenID.EmployeeDetails]: {id: number};
  [EmployeeManagementScreenID.CreatePayslip]: undefined;
  [EmployeeManagementScreenID.CreateEmployee]: undefined;
};

const EmployeeManagementStack =
  createStackNavigator<EmployeeManagementStackParams>();

export const EmployeeManagementNavigation = () => {
  return (
    <EmployeeManagementStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <EmployeeManagementStack.Screen
        name={EmployeeManagementScreenID.EmployeeDetails}
        getComponent={() =>
          require('../../screens/EmployeeManagement/EmployeeDetails').default
        }
      />
      <EmployeeManagementStack.Screen
        name={EmployeeManagementScreenID.CreatePayslip}
        getComponent={() =>
          require('../../screens/EmployeeManagement/CreatePayslip').default
        }
      />
      <EmployeeManagementStack.Screen
        name={EmployeeManagementScreenID.CreateEmployee}
        getComponent={() =>
          require('../../screens/EmployeeManagement/CreateEmployee').default
        }
      />
    </EmployeeManagementStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const EmployeeManagementTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <NavigationTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarShowIcon: true,
          title: 'Nhân viên',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={18}
                color={focused ? c.white : c.green300}
                type={IconType.ionIcon}
                name="md-people-sharp"
              />
            );
          },
        }}
        name={EmployeeManagementTabScreenID.Employess}
        component={LazyEmployees}
      />
      <Tab.Screen
        options={{
          title: 'Tính lương',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={18}
                color={focused ? c.white : c.green300}
                type={IconType.material}
                name="calculate"
              />
            );
          },
        }}
        name={EmployeeManagementTabScreenID.Salary}
        component={LazySalary}
      />
    </Tab.Navigator>
  );
};

export default EmployeeManagementNavigation;
