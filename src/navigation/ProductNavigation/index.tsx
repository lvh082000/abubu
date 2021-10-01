import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationTabBar} from 'components/MyTabBar';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {c} from 'styles/shared';
import LazyProductsTab from './components/LazyProductsTab';
import LazyInventoryControl from './components/LazyInventoryControl';
import LazyPriceSetting from './components/LazyPriceSetting';
import {ProductMetaType} from 'types/Responses/FetchGetProductMetaResponse';
import {PriceType} from 'types/Responses/FetchGetPriceResponse';
import {InventoryDetailsType} from 'types/Responses/FetchGetInventoryResponse';
import {ProductPropType} from 'types/Properties';

export enum ProductScreenID {
  CreateOrUpdateProduct = 'ProductScreen_CreateOrUpdateProduct',
  ChoosePriceList = 'ProductScreen_ChoosePriceList',
  SelectProps = 'ProductScreen_SelectProps',
  CreateOrUpdateProp = 'ProductScreen_CreateOrUpdateProp',
  CreateOrUpdateCategory = 'ProductScreen_CreateOrUpdateCategory',
  CreateOrUpdateLocation = 'ProductScreen_CreateOrUpdateLocation',
  CreateOrUpdateBrand = 'ProductScreen_CreateOrUpdateBrand',
  CreateOrUpdatePrice = 'ProductScreen_CreateOrUpdatePrice',
  AbubuWorldCategories = 'ProductScreen_AbubuWorldCategories',
  CreateOrUpdateProperty = 'ProductScreen_CreateOrUpdateProperty',
  TicketDetails = 'ProductScreen_TicketDetails',
  CheckProduct = 'ProductScreen_CheckProduct',
}

export type ProductStackParams = {
  [ProductScreenID.CreateOrUpdateProduct]: {id: number} | undefined;
  [ProductScreenID.ChoosePriceList]:
    | {priceSetting: number; useActions?: boolean}
    | undefined;
  [ProductScreenID.SelectProps]: {
    value: string;
    type: ProductPropType;
  };
  [ProductScreenID.CreateOrUpdateProp]: {
    value: ProductMetaType | undefined;
    type: ProductPropType;
    title: string;
  };
  [ProductScreenID.AbubuWorldCategories]: undefined;
  [ProductScreenID.CreateOrUpdatePrice]: PriceType | undefined;
  [ProductScreenID.TicketDetails]: InventoryDetailsType;
  [ProductScreenID.CheckProduct]: {productIds: Array<number>};
};

export enum ProductTabScreenID {
  Products = 'ProductTabScreen_Products',
  PriceSetting = 'ProductTabScreen_PriceSetting',
  InventoryControl = 'ProductTabScreen_InventoryControl',
}

const ProductStack = createStackNavigator<ProductStackParams>();

const Tab = createMaterialTopTabNavigator();

const ProductNavigation = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <ProductStack.Screen
        name={ProductScreenID.CreateOrUpdateProduct}
        getComponent={() =>
          require('../../screens/Product/CreateOrUpdateProduct').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.ChoosePriceList}
        getComponent={() =>
          require('../../screens/Product/ChoosePriceList').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.AbubuWorldCategories}
        getComponent={() =>
          require('../../screens/Product/AbubuWorldCategories').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.SelectProps}
        getComponent={() =>
          require('../../screens/Product/SelectProps').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.CreateOrUpdateProp}
        getComponent={() =>
          require('../../screens/Product/CreateOrUpdateProp').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.CreateOrUpdatePrice}
        getComponent={() =>
          require('../../screens/Product/CreateOrUpdatePrice').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.TicketDetails}
        getComponent={() =>
          require('../../screens/Product/TicketDetails').default
        }
      />

      <ProductStack.Screen
        name={ProductScreenID.CheckProduct}
        getComponent={() =>
          require('../../screens/Product/CheckProduct').default
        }
      />
    </ProductStack.Navigator>
  );
};

export const ProductTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => <NavigationTabBar {...props} />}>
      <Tab.Screen
        options={{
          title: 'Danh mục',
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
        name={ProductTabScreenID.Products}
        component={LazyProductsTab}
      />
      <Tab.Screen
        options={{
          title: 'Thiết lập giá',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.materialCommunity}
                name="tag-outline"
              />
            );
          },
        }}
        component={LazyPriceSetting}
        name={ProductTabScreenID.PriceSetting}
      />
      <Tab.Screen
        options={{
          title: 'Kiểm kho',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.material}
                name="fact-check"
              />
            );
          },
        }}
        component={LazyInventoryControl}
        name={ProductTabScreenID.InventoryControl}
      />
    </Tab.Navigator>
  );
};

export default ProductNavigation;
