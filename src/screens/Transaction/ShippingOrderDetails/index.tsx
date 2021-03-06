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
        return '????NG G??I V?? CH???N GIAO H??NG';
      case ShippingOrderStatusType.Exporting:
        return 'XU???T KHO';
      case ShippingOrderStatusType.Delivering:
        return '???? GIAO H??NG';
      case ShippingOrderStatusType.Success:
        return 'C???P NH???T';
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
    const options = ['T??? g???i ng?????i giao h??ng'];
    showBottomActions(
      {
        options:
          order.paymentType === ShippingPaymentMethodType.Cod
            ? options
            : [...options, 'Nh???n t???i c???a h??ng'],
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
      message: `H??? th???ng s??? t??? ?????ng hu??? kho???n shipper ?????t c???c. Ph?? tr??? cho shipper m???c ?????nh l?? ti???n m???t (n???u c??), s??? ti???n ???? thu h??? COD m???c ?????nh l?? ti???n m???t (n???u c??). B???n c?? th??? thay ?????i b???ng c??ch c???p nh???p l???i ph????ng th???c thanh to??n. B???n thu th??m ti???n b???ng n??t "T???o phi???u thu" ??? m??n h??nh ????n h??ng sau`,
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
            description={`????n h??ng tr???c ti???p: ${toFormatDate(order.createdAt)}`}
            customer={order.guestName}
          />
          <OrderInfo total={order.total} products={order.products}>
            <OrderInfoRow
              title="Gi???m gi?? h??a ????n"
              value={toStringPrice(order.discountValue)}
            />
            <OrderInfoOtherRevenues data={order.surcharges} />

            <OrderInfoRow title="Ph?? Cod" value={toStringPrice(order.codFee)} />

            <OrderInfoRow
              title="Kh??ch c???n tr???"
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
        description="M?? t??? v??? m??n h??nh n??y"
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
