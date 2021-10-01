import {GradientHeader} from 'components/Header';
import KeyboardScrollView from 'components/KeyboardScrollView';
import NoDataView from 'components/NoDataView';
import {
  PriceSelection,
  PartnerSelection,
  RoomSelection,
} from 'components/SectionMenu';
import SelectProductsOrScanQRCode from 'components/SelectProductsOrScanQRCode';
import {useSpinner} from 'components/Spinner';
import Constants from 'config/Constants';
import DeviceHelper from 'config/DeviceHelper';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {OrderService} from 'services/OrderService';
import {ContainerStyles} from 'styles/elements';
import {c, l} from 'styles/shared';
import {
  OrderDiscountType,
  OrderType,
  SelectedProductType,
  TotalCheckoutType,
} from 'types/Properties';
import CheckoutButton from './components/CheckoutButton';
import OrderedProducts from '../components/OrderedProducts';
import {RouteProp} from '@react-navigation/native';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {PartnerDetailsType} from 'types/Responses/FetchGetPartnerDetailsResponse';
import NavigationService from 'services/NavigationService';
import {useDialog} from 'components/Dialog';
import {OrderCheckoutParams} from 'types/Params';

interface Props {
  route: RouteProp<TransactionStackParams, TransactionScreenID.CreateOrder>;
}

const CreateOrder = ({route: {params}}: Props) => {
  const [totalData, setTotalData] = useState<TotalCheckoutType | undefined>(
    undefined,
  );
  const [products, setProducts] = useState<SelectedProductType[]>([]);
  const [selectedPrice, setPrice] = useState<number>(Constants.DefaultPrice.id);
  const selectedCustomer = useRef<PartnerDetailsType | undefined>(undefined);
  const selectedRoomId = useRef<number | undefined>(params.roomId);
  const spinner = useSpinner();
  const dialog = useDialog();
  const title = useMemo(() => {
    if (params.type === OrderType.Return) {
      return 'Trả nhanh';
    }
    return 'Tạo đơn hàng';
  }, [params.type]);

  const onSelectedProducts = useCallback(async products => {
    await fetchCalculateTotalPrice({products});
    setProducts(products);
  }, []);

  const onQuantityChange = useCallback(
    async (products: Array<SelectedProductType>) => {
      const item = products.find(v => v.quantity === 0);
      let data = products;
      if (item) {
        data = products.filter(v => v.quantity > 0);
        setProducts(data);
      }

      await fetchCalculateTotalPrice({products: data});
    },
    [],
  );

  const fetchCalculateTotalPrice = async (values: {
    products?: SelectedProductType[];
    discount?: OrderDiscountType;
    surcharges?: Array<number>;
    priceId?: number;
  }) => {
    try {
      spinner.show();
      if (params.type === OrderType.Return) {
        const total =
          await OrderService.fetchCalculateReturnProductTotalPrice({
            products: values.products ?? products,
            priceSetting: values.priceId ?? selectedPrice,
          });
        setTotalData({
          paymentRequire: total,
          totalAmount: total,
          totalProductAmount: total,
          totalSurcharge: 0,
        });
      } else {
        const data = await OrderService.fetchCalculateOrderTotalPrice({
          ...values,
          products: values.products ?? products,
          priceId: values.priceId ?? selectedPrice,
        });
        setTotalData({
          paymentRequire: data.paymentRequire,
          totalAmount: data.totalAmount,
          totalProductAmount: data.totalProductAmount,
          totalSurcharge: data.totalSurcharge,
        });
      }
    } catch (error) {
      console.log('[ERROR] fetchCalculateTotalPrice', error);
    } finally {
      spinner.dismiss();
    }
  };

  const handleCheckoutTakeAway = (values: Partial<OrderCheckoutParams>) => {
    NavigationService.pushToScreen(
      TransactionScreenID.TakeAwayCheckout,
      values,
    );
  };

  const handleCheckoutShipping = (values: Partial<OrderCheckoutParams>) => {
    if (selectedCustomer.current) {
      NavigationService.pushToScreen(
        TransactionScreenID.ShippingCheckout,
        values,
      );
    } else {
      dialog.show({
        type: 'Error',
        message: 'Vui lòng chọn khách hàng để tiếp tục',
      });
    }
  };

  const handleCheckoutReturn = (values: Partial<OrderCheckoutParams>) => {
    NavigationService.pushToScreen(TransactionScreenID.ReturnProductCheckout, {
      paymentRequire: values.paymentRequire,
      guestId: values.guestId,
      products: values.products,
      priceSetting: values.priceId,
      totalPrice: values.totalProductAmount,
      orderId: undefined,
    });
  };

  const handleCheckoutBookByRoom = async (values: OrderCheckoutParams) => {
    try {
      spinner.show();
      const {type, guestId, priceId, products, roomId} = values;
      const {data} = await OrderService.fetchCreateOrder({
        type,
        guestId,
        priceId,
        products,
        roomId,
        payments: [],
      });
      NavigationService.replace(TransactionScreenID.BookByRoomOrderDetails, {
        id: data.id,
        code: data.code,
      });
    } catch (error) {
      console.log('[ERROR] handleCheckoutBookByRoom', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onCheckout = async () => {
    const values = {
      type: params.type,
      guestId: selectedCustomer.current?.id ?? -1,
      priceId: selectedPrice,
      products,
      total: totalData?.totalAmount as number,
      paymentRequire: totalData?.paymentRequire as number,
      totalProductAmount: totalData?.totalProductAmount as number,
      totalSurcharge: totalData?.totalSurcharge as number,
    };
    switch (params.type) {
      case OrderType.TakeAway:
        handleCheckoutTakeAway(values);
        break;
      case OrderType.BookByRoom:
        //@ts-ignore
        await handleCheckoutBookByRoom({
          ...values,
          roomId: selectedRoomId.current,
        });
        break;
      case OrderType.Shipping:
        handleCheckoutShipping(values);
        break;
      case OrderType.Return:
        handleCheckoutReturn(values);
        break;
    }
  };

  const onPriceSelected = useCallback(
    async (id: number) => {
      setPrice(id);
      if (products.length > 0) {
        await fetchCalculateTotalPrice({
          priceId: id,
        });
      }
    },
    [products],
  );

  const onCustomerSelected = useCallback(
    (partner: PartnerDetailsType | undefined) => {
      selectedCustomer.current = partner;
    },
    [],
  );

  const onRoomSelected = useCallback(id => {
    selectedRoomId.current = id;
  }, []);

  const renderContent = () => {
    return (
      <KeyboardScrollView>
        <SelectProductsOrScanQRCode
          onSelected={onSelectedProducts}
          selectedPrice={selectedPrice}
          numberOfSelected={products.length}
        />
        <View style={[l.py30, {backgroundColor: c.grey100}]}>
          <PriceSelection onSelected={onPriceSelected} />
          {params.type === OrderType.BookByRoom && (
            <RoomSelection
              onSelected={onRoomSelected}
              initialValue={params.roomId}
            />
          )}
          <PartnerSelection onSelected={onCustomerSelected} type="guest" />
        </View>

        {products.length > 0 && (
          <OrderedProducts
            onQuantityChange={onQuantityChange}
            data={products}
          />
        )}

        {products.length === 0 && (
          <NoDataView title="Chọn sản phẩm để tiếp tục" />
        )}
      </KeyboardScrollView>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={title}
      />

      {!DeviceHelper.isIOS && (
        <>
          {renderContent()}
          <CheckoutButton
            type={params.type}
            onPress={onCheckout}
            total={totalData?.paymentRequire ?? 0}
          />
        </>
      )}
      {DeviceHelper.isIOS && (
        <>
          {renderContent()}
          <KeyboardAvoidingView behavior="position">
            <CheckoutButton
              type={params.type}
              onPress={onCheckout}
              total={totalData?.paymentRequire ?? 0}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

export default CreateOrder;
