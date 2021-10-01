import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationTabBar} from 'components/MyTabBar';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';
import LazyFinance from './components/LazyFinance';
import LazyProducts from './components/LazyProducts';
import LazySale from './components/LazySale';
import {ReportParams} from 'types/Params';

export enum ReportTabScreenID {
  Sale = 'ReportTabScreenID_Sale',
  Finance = 'ReportTabScreenID_Finance',
  Products = 'ReportTabScreenID_Products',
}

export enum ReportScreenID {
  SalesReport = 'ReportScreen_SalesReport',
  SalesReportDetails = 'ReportScreen_SalesReportDetails',
  FinanceRevenueReport = 'ReportScreen_FinanceRevenueReport',
  FinanceCashBook = 'ReportScreen_FinanceCashBook',
  FinanceDebtReport = 'ReportScreen_FinanceDebtReport',
  FinanceDebtReportDetails = 'ReportScreen_FinanceDebtReportDetails',
  ProductsInventoryReport = 'ReportScreen_ProductsInventoryReport',
  ProductsInventoryBook = 'ReportScreen_ProductsInventoryBook',
  ProductsInventoryBookDetails = 'ReportScreen_ProductsInventoryBookDetails',
  ProductsExportImportReport = 'ReportScreen_ProductsExportImportReport',
}

export type ReportStackParams = {
  [ReportScreenID.SalesReport]: ReportParams;
  [ReportScreenID.SalesReportDetails]: ReportParams;
  [ReportScreenID.FinanceRevenueReport]: undefined;
  [ReportScreenID.FinanceCashBook]: undefined;
  [ReportScreenID.FinanceDebtReport]: undefined;
  [ReportScreenID.FinanceDebtReportDetails]: ReportParams;
  [ReportScreenID.ProductsInventoryReport]: undefined;
  [ReportScreenID.ProductsInventoryBook]: undefined;
  [ReportScreenID.ProductsInventoryBookDetails]: ReportParams;
  [ReportScreenID.ProductsExportImportReport]: ReportParams;
};

const ReportStack = createStackNavigator<ReportStackParams>();

export const ReportNavigation = () => {
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <ReportStack.Screen
        name={ReportScreenID.SalesReport}
        getComponent={() => require('../../screens/Report/SalesReport').default}
      />
      <ReportStack.Screen
        name={ReportScreenID.SalesReportDetails}
        getComponent={() =>
          require('../../screens/Report/SalesReportDetails').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.FinanceRevenueReport}
        getComponent={() =>
          require('../../screens/Report/FinanceRevenueReport').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.FinanceCashBook}
        getComponent={() =>
          require('../../screens/Report/FinanceCashBook').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.FinanceDebtReport}
        getComponent={() =>
          require('../../screens/Report/FinanceDebtReport').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.FinanceDebtReportDetails}
        getComponent={() =>
          require('../../screens/Report/FinanceDebtReportDetails').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.ProductsInventoryReport}
        getComponent={() =>
          require('../../screens/Report/ProductsInventoryReport').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.ProductsInventoryBook}
        getComponent={() =>
          require('../../screens/Report/ProductsInventoryBook').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.ProductsInventoryBookDetails}
        getComponent={() =>
          require('../../screens/Report/ProductsInventoryBookDetails').default
        }
      />
      <ReportStack.Screen
        name={ReportScreenID.ProductsExportImportReport}
        getComponent={() =>
          require('../../screens/Report/ProductsExportImportReport').default
        }
      />
    </ReportStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const ReportTabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <NavigationTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarShowIcon: true,
          title: 'Bán hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.custom}
                name="bag"
              />
            );
          },
        }}
        name={ReportTabScreenID.Sale}
        component={LazySale}
      />
      <Tab.Screen
        options={{
          title: 'Tài chính',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.ionIcon}
                name="bar-chart"
              />
            );
          },
        }}
        name={ReportTabScreenID.Finance}
        component={LazyFinance}
      />
      <Tab.Screen
        options={{
          title: 'Hàng hóa',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.material}
                name="category"
              />
            );
          },
        }}
        name={ReportTabScreenID.Products}
        component={LazyProducts}
      />
    </Tab.Navigator>
  );
};

export default ReportNavigation;
