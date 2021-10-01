import {RouteProp} from '@react-navigation/native';
import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {GradientHeader} from 'components/Header';
import OrderInfo, {
  OrderInfoOtherRevenues,
  OrderInfoRow,
} from '../components/OrderInfo';
import OrderStatusProgress from './components/OrderStatusProgress';
import {
  TransactionScreenID,
  TransactionStackParams,
  TransactionTabScreenID,
} from 'navigation/TransactionNavigation';
import React, {useCallback, useMemo, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {useFetch} from 'hooks/useFetch';
import {OrderDetailsType} from 'types/Responses/FetchGetOrderDetailsResponse';
import {OrderService} from 'services/OrderService';
import LoadingView from 'components/LoadingView';
import ShippingPaidList from './components/ShippingPaidList';
import GradientButton from 'components/GradientButton';
import {
  OrderType,
  ShippingOrderStatusType,
  ShippingPaymentMethodType,
} from 'types/Properties';
import {useSpinner} from 'components/Spinner';
import {
  FetchUpdateShippingPaymentOrderParams,
  OrderPaymentParams,
} from 'types/Params';
import {useBottomAction} from 'hooks/useBottomAction';
import NavigationService from 'services/NavigationService';
import DeliveryStatus from './components/DeliveryStatus';
import {useDialog} from 'components/Dialog';
import {useAndroidBack} from 'hooks/useAndroidBack';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ShippingOrderDetails
  >;
}

const ShippingOrderDetails = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const {showBottomActions} = useBottomAction();
  const scrollViewRef = useRef<ScrollView>(null);
  const {isLoading, data, setData} = useFetch<OrderDetailsType>(
    OrderService.fetchGetOrderDetails,
    {
      params: params.isProcessing ? false : params.id,
    },
  );
  const order = useMemo(() => {
    return {
      ...params,
      ...data,
    };
  }, [params, data]);

  const titleButton = useMemo(() => {
    switch (order.status) {
      case ShippingOrderStatusType.Packing:
        return 'ĐÓNG GÓI VÀ CHỌN GIAO HÀNG';
      case ShippingOrderStatusType.Exporting:
        return 'XUẤT KHO';
      case ShippingOrderStatusType.Delivering:
        return 'ĐÃ GIAO HÀNG';
      case ShippingOrderStatusType.Success:
        return 'CẬP NHẬT';
    }
  }, [order]);

  const isTakeOnStore = useMemo(() => {
    return (
      order.status >= ShippingOrderStatusType.Exporting &&
      order.shipInfo?.shipperId === -1
    );
  }, [order]);

  const handleBack = useCallback(() => {
    if (params.isProcessing) {
      NavigationService.replace(RootScreenID.MainDrawer, {
        screen: DrawerScreenID.Transaction,
        params: {
          screen: TransactionTabScreenID.Shipping,
        },
      });
    } else {
      NavigationService.goBack();
    }
  }, [params.isProcessing]);

  const onPackaged = () => {
    const options = ['Tự gọi người giao hàng'];
    showBottomActions(
      {
        options:
          order.paymentType === ShippingPaymentMethodType.Cod
            ? options
            : [...options, 'Nhận tại cửa hàng'],
      },
      async (index: number) => {
        if (index === 0) {
          NavigationService.pushToScreen(
            TransactionScreenID.ShippingDelivery,
            order,
          );
        } else {
          await fetchUpdateOrder({
            payments: [],
            newStatus: ShippingOrderStatusType.Exporting,
          });
        }
      },
    );
  };

  const onExported = async () => {
    if (isTakeOnStore) {
      await fetchUpdateOrder({
        ...order,
        payments: [],
        newStatus: ShippingOrderStatusType.Delivering,
      });
    } else {
      //@ts-ignore
      const status = order.shipInfo.shipId
        ? ShippingOrderStatusType.Exporting
        : ShippingOrderStatusType.Delivering;
      await fetchUpdateOrder({
        ...order,
        payments: [],
        newStatus: status,
      });

      if (status === ShippingOrderStatusType.Exporting) {
        NavigationService.replace(TransactionScreenID.ShippingSetStakes, order);
      }
    }
  };

  const onDelivered = async () => {
    await fetchUpdateOrder({
      payments: [],
      newStatus: ShippingOrderStatusType.Success,
    });
    dialog.show({
      type: 'Success',
      message: `Hệ thống sẽ tự động huỷ khoản shipper đặt cọc. Phí trả cho shipper mặc định là tiền mặt (nếu có), số tiền đã thu hộ COD mặc định là tiền mặt (nếu có). Bạn có thể thay đổi bằng cách cập nhập lại phương thức thanh toán. Bạn thu thêm tiền bằng nút "Tạo phiếu thu" ở màn hình đơn hàng sau`,
    });
  };

  const onActionPress = useCallback(async () => {
    switch (order?.status) {
      case ShippingOrderStatusType.Packing:
        await onPackaged();
        break;
      case ShippingOrderStatusType.Exporting:
        await onExported();
        break;
      case ShippingOrderStatusType.Delivering:
        await onDelivered();
        break;
    }
    scrollViewRef.current?.scrollTo({animated: false});
  }, [order]);

  const onAddPayment = useCallback(
    async (payment: OrderPaymentParams) => {
      await fetchUpdateOrder({
        newStatus: ShippingOrderStatusType.Success,
        payments: [payment],
      });
    },
    [order],
  );

  const onDebtPayment = useCallback(
    async (payment: OrderPaymentParams) => {
      await fetchUpdateOrder({
        newStatus: ShippingOrderStatusType.Success,
        payments: [],
        debtPaymentMethod: {
          method: payment.method,
          account: payment.account as string,
          name: payment.name as string,
        },
      });
    },
    [order],
  );

  const onFeeShipPayment = useCallback(
    async (payment: OrderPaymentParams) => {
      await fetchUpdateOrder({
        newStatus: ShippingOrderStatusType.Success,
        payments: [],
        shipFeePaymentMethod: {
          method: payment.method,
          account: payment.account as string,
          name: payment.name as string,
        },
      });
    },
    [order],
  );

  const fetchUpdateOrder = async (
    body: Pick<
      FetchUpdateShippingPaymentOrderParams,
      'newStatus' | 'payments' | 'debtPaymentMethod' | 'shipFeePaymentMethod'
    >,
  ) => {
    try {
      spinner.show();
      const values = OrderService.parseDataUpdateShippingPaymentOrder(
        order as OrderDetailsType,
      );
      const {data} = await OrderService.fetchUpdateShippingPaymentOrder({
        ...values,
        id: params.id,
        newStatus: body.newStatus,
        payments: body.payments,
        debtPaymentMethod: body.debtPaymentMethod,
        shipFeePaymentMethod: body.shipFeePaymentMethod,
      });
      setData(data);
    } catch (error) {
      console.log('[ERROR] fetchUpdateOrder', error);
    } finally {
      spinner.dismiss();
    }
  };

  useAndroidBack(() => {
    handleBack();
  }, [params]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!order) {
      return null;
    }
    return (
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={l.flex}>
        <OrderStatusProgress shipInfo={order.shipInfo} />
        <View style={l.flex}>
          <CustomerOrderDetails
            createdBy={order.actorName}
            description={`Đơn hàng trực tiếp: ${toFormatDate(order.createdAt)}`}
            customer={order.guestName}
          />
          <OrderInfo total={order.total} products={order.products}>
            <OrderInfoRow
              title="Giảm giá hóa đơn"
              value={toStringPrice(order.discountValue)}
            />
            <OrderInfoOtherRevenues data={order.surcharges} />

            <OrderInfoRow title="Phí Cod" value={toStringPrice(order.codFee)} />

            <OrderInfoRow
              title="Khách cần trả"
              value={toStringPrice(order.paymentRequire)}
            />
          </OrderInfo>
        </View>
        <ShippingPaidList
          status={order.status}
          codAmount={order.shipInfo.codAmount}
          payments={order.payments}
          total={order.paymentRequire}
          isTakeOnStore={isTakeOnStore}
          paid={order.paid}
          onAddPayment={onAddPayment}
          onDebtPayment={onDebtPayment}
        />
        <DeliveryStatus
          isTakeOnStore={isTakeOnStore}
          status={order.status}
          shipInfo={order.shipInfo}
          onFeeShipPayment={onFeeShipPayment}
        />
        {order.status < ShippingOrderStatusType.Success && (
          <GradientButton
            widgetStyles={{
              container: [l.mt30, l.mb30, l.mx20],
            }}
            title={titleButton}
            onPress={onActionPress}
          />
        )}
        {order.status >= ShippingOrderStatusType.Success && (
          <View style={{height: 20}} />
        )}
      </ScrollView>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        goBack={handleBack}
        description="Mô tả về màn hình này"
        title={params.code}
        useBack
        rightComponent={
          <OrderDetailsHeaderActions
            orderId={params.id}
            type={OrderType.Shipping}
            useDelete={data?.status !== ShippingOrderStatusType.Cancel}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default ShippingOrderDetails;
