import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {c} from 'styles/shared';
import {
  ImportProductSettingParams,
  OrderCheckoutParams,
  PayBillParams,
  ReturnProductCheckoutParams,
  ShippingOrderDetailsParams,
} from 'types/Params';
import {
  CreateOrUpdateRoomValues,
  OrderType,
  ShippingOrderStatusType,
} from 'types/Properties';
import {CreateOrUpdateImportProductType} from 'types/Responses/FetchCreateOrUpdateImportProductResponse';
import {OrderItemType} from 'types/Responses/FetchGetOrdersResponse';
import LazyBookByRoom from './components/LazyBookByRoom';
import LazyImportProduct from './components/LazyImportProduct';
import LazyReturnOfImportedGoods from './components/LazyReturnOfImportedGoods';
import LazyReturnProduct from './components/LazyReturnProduct';
import LazyShipping from './components/LazyShipping';
import LazyTakeAway from './components/LazyTakeAway';
import {MyTabBar} from './components/MyTabBar';

export enum TransactionTabScreenID {
  TakeAway = 'TransactionTabScreen_TakeAway',
  Shipping = 'TransactionTabScreen_Shipping',
  BookByRoom = 'TransactionTabScreen_BookByRoom',
  ImportProduct = 'TransactionTabScreen_ImportProduct',
  ReturnProduct = 'TransactionTabScreen_ReturnProduct',
  ReturnOfImportedGoods = 'TransactionTabScreen_ReturnOfImportedGoods',
}

export enum TransactionScreenID {
  CreateOrder = 'TransactionScreen_CreateOrder',
  TakeAwayOrderDetails = 'TransactionScreen_TakeAwayOrderDetails',
  PayBill = 'TransactionScreen_PayBill',
  CreateOrUpdatePayBill = 'TransactionScreen_CreateOrUpdatePayBill',
  TakeAwayCheckout = 'TransactionScreen_TakeAwayCheckout',
  ShippingCheckout = 'TransactionScreen_ShippingCheckout',
  ShippingOrderDetails = 'TransactionScreen_ShippingOrderDetails',
  ShippingDelivery = 'TransactionScreen_ShippingDelivery',
  ShippingSetStakes = 'TransactionScreen_ShippingSetStakes',
  ShippingStatusOrders = 'TransactionScreen_ShippingStatusOrders',
  ReturnProductDetails = 'TransactionScreen_ReturnProductDetails',
  ListOfSoldOrders = 'TransactionScreen_ListOfSoldOrders',
  CreateReturnProduct = 'TransactionScreen_CreateReturnProduct',
  BookByRoomOrderDetails = 'TransactionScreen_BookByRoomOrderDetails',
  SelectRooms = 'TransactionScreen_SelectRooms',
  ImportProductDetails = 'TransactionScreen_ImportProductDetails',
  CreateImportProduct = 'TransactionScreen_CreateImportProduct',
  ImportProductSetting = 'TransactionScreen_ImportProductSetting',
  ReturnOfImportedGoodDetails = 'TransactionScreen_ReturnOfImportedGoodDetails',
  ImportProductCheckout = 'TransactionScreen_ImportProductCheckout',
  CreateOrUpdateRoom = 'TransactionScreen_CreateOrUpdateRoom',
  BookByRoomCheckout = 'TransactionScreen_BookByRoomCheckout',
  ReturnProductCheckout = 'TransactionScreen_ReturnProductCheckout',
}

export type TransactionStackParams = {
  [TransactionScreenID.CreateOrder]: {type: OrderType; roomId?: number};
  [TransactionScreenID.TakeAwayCheckout]: OrderCheckoutParams;
  [TransactionScreenID.ShippingCheckout]: OrderCheckoutParams;
  [TransactionScreenID.BookByRoomCheckout]: OrderCheckoutParams;
  [TransactionScreenID.TakeAwayOrderDetails]: {id: number; code: string};
  [TransactionScreenID.PayBill]: PayBillParams;
  [TransactionScreenID.CreateOrUpdatePayBill]: PayBillParams;
  [TransactionScreenID.ShippingOrderDetails]: ShippingOrderDetailsParams;
  [TransactionScreenID.ShippingDelivery]: ShippingOrderDetailsParams;
  [TransactionScreenID.ShippingSetStakes]: ShippingOrderDetailsParams;
  [TransactionScreenID.ShippingStatusOrders]: {
    status: ShippingOrderStatusType;
    title: string;
  };
  [TransactionScreenID.ReturnProductDetails]: {id: number; code: string};
  [TransactionScreenID.ListOfSoldOrders]: undefined;
  [TransactionScreenID.CreateReturnProduct]: OrderItemType;
  [TransactionScreenID.BookByRoomOrderDetails]: {id: number; code: string};
  [TransactionScreenID.CreateOrUpdateRoom]: CreateOrUpdateRoomValues;
  [TransactionScreenID.SelectRooms]: {useSelect: boolean} | undefined;
  [TransactionScreenID.ImportProductDetails]: {id: number; code: string};
  [TransactionScreenID.CreateImportProduct]: {isImportProduct: boolean};
  [TransactionScreenID.ImportProductSetting]: ImportProductSettingParams;
  [TransactionScreenID.ReturnOfImportedGoodDetails]: {id: number; code: string};
  [TransactionScreenID.ImportProductCheckout]: CreateOrUpdateImportProductType;
  [TransactionScreenID.ReturnProductCheckout]: ReturnProductCheckoutParams;
};

const TransactionStack = createStackNavigator<TransactionStackParams>();

const TransactionNavigation = () => {
  return (
    <TransactionStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <TransactionStack.Screen
        name={TransactionScreenID.CreateOrder}
        getComponent={() =>
          require('../../screens/Transaction/CreateOrder').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.BookByRoomCheckout}
        getComponent={() =>
          require('../../screens/Transaction/BookByRoomCheckout').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.TakeAwayCheckout}
        getComponent={() =>
          require('../../screens/Transaction/TakeAwayCheckout').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.TakeAwayOrderDetails}
        getComponent={() =>
          require('../../screens/Transaction/TakeAwayOrderDetails').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.PayBill}
        getComponent={() =>
          require('../../screens/Transaction/PayBill').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.CreateOrUpdatePayBill}
        getComponent={() =>
          require('../../screens/Transaction/CreateOrUpdatePayBill').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ShippingCheckout}
        getComponent={() =>
          require('../../screens/Transaction/ShippingCheckout').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ShippingOrderDetails}
        getComponent={() =>
          require('../../screens/Transaction/ShippingOrderDetails').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ShippingDelivery}
        getComponent={() =>
          require('../../screens/Transaction/ShippingDelivery').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ShippingStatusOrders}
        getComponent={() =>
          require('../../screens/Transaction/ShippingStatusOrders').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ShippingSetStakes}
        getComponent={() =>
          require('../../screens/Transaction/ShippingSetStakes').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ReturnProductDetails}
        getComponent={() =>
          require('../../screens/Transaction/ReturnProductDetails').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.BookByRoomOrderDetails}
        getComponent={() =>
          require('../../screens/Transaction/BookByRoomOrderDetails').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.CreateOrUpdateRoom}
        getComponent={() =>
          require('../../screens/Transaction/CreateOrUpdateRoom').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ListOfSoldOrders}
        getComponent={() =>
          require('../../screens/Transaction/ListOfSoldOrders').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <TransactionStack.Screen
        name={TransactionScreenID.SelectRooms}
        getComponent={() =>
          require('../../screens/Transaction/SelectRooms').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.CreateReturnProduct}
        getComponent={() =>
          require('../../screens/Transaction/CreateReturnProduct').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ImportProductDetails}
        getComponent={() =>
          require('../../screens/Transaction/ImportProductDetails').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.CreateImportProduct}
        getComponent={() =>
          require('../../screens/Transaction/CreateImportProduct').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ImportProductSetting}
        getComponent={() =>
          require('../../screens/Transaction/ImportProductSetting').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ReturnOfImportedGoodDetails}
        getComponent={() =>
          require('../../screens/Transaction/ReturnOfImportedGoodDetails')
            .default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ImportProductCheckout}
        getComponent={() =>
          require('../../screens/Transaction/ImportProductCheckout').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <TransactionStack.Screen
        name={TransactionScreenID.ReturnProductCheckout}
        getComponent={() =>
          require('../../screens/Transaction/ReturnProductCheckout').default
        }
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </TransactionStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export const TransactionTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarShowIcon: true,
          title: 'Bán trực tiếp',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.ionIcon}
                name="document-text"
              />
            );
          },
        }}
        name={TransactionTabScreenID.TakeAway}
        component={LazyTakeAway}
      />
      <Tab.Screen
        options={{
          title: 'Bán ship COD',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.materialCommunity}
                name="truck"
              />
            );
          },
        }}
        component={LazyShipping}
        name={TransactionTabScreenID.Shipping}
      />
      <Tab.Screen
        options={{
          title: 'Đặt theo bàn phòng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.materialCommunity}
                name="tag-text"
              />
            );
          },
        }}
        component={LazyBookByRoom}
        name={TransactionTabScreenID.BookByRoom}
      />
      <Tab.Screen
        options={{
          title: 'Trả hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.entypo}
                name="reply"
              />
            );
          },
        }}
        component={LazyReturnProduct}
        name={TransactionTabScreenID.ReturnProduct}
      />
      <Tab.Screen
        options={{
          title: 'Nhận hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.entypo}
                name="forward"
              />
            );
          },
        }}
        component={LazyImportProduct}
        name={TransactionTabScreenID.ImportProduct}
      />
      <Tab.Screen
        options={{
          title: 'Trả nhập hàng',
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                size={16}
                color={focused ? c.white : c.green300}
                type={IconType.materialCommunity}
                name="recycle"
              />
            );
          },
        }}
        component={LazyReturnOfImportedGoods}
        name={TransactionTabScreenID.ReturnOfImportedGoods}
      />
    </Tab.Navigator>
  );
};

export default TransactionNavigation;
