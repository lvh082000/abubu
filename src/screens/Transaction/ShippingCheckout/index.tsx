import {GradientHeader} from 'components/Header';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import Form from './components/Form';
import {RouteProp} from '@react-navigation/native';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {
  ShippingCheckoutFormValues as FormValues,
  ShippingPaymentMethodType,
  TotalCheckoutType,
} from 'types/Properties';
import {OrderService} from 'services/OrderService';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {useSpinner} from 'components/Spinner';
import {l} from 'styles/shared';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDialog} from 'components/Dialog';
import NavigationService from 'services/NavigationService';
import {
  ShippingPaidModal,
  ShippingPaidModalRef,
} from '../components/ShippingPaidModal';
import {useBottomSheet} from 'components/BottomSheet';
import {
  PaymentMethodBottomSheet,
  PaymentMethodSelectedData,
} from 'components/SharedBottomSheets';
import {CreateOrUpdateOrderType} from 'types/Responses/FetchCreateOrUpdateOrderResponse';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ShippingCheckout
  >;
}

const ShiipingCheckout = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const [totalData, setTotalData] = useState<TotalCheckoutType>({
    paymentRequire: params.paymentRequire,
    totalAmount: params.totalAmount,
    totalProductAmount: params.totalProductAmount,
    totalSurcharge: params.totalSurcharge,
  });
  const modalRef = useRef<ShippingPaidModalRef>(null);
  const selectedPaymentMethod = useRef<PaymentMethodSelectedData | undefined>(
    undefined,
  );
  const formValues = useRef<FormValues | undefined>(undefined);

  const {showBottomSheet} = useBottomSheet();

  const getFormValues = (values: FormValues) => {
    const {otherRevenues, uom, value, codFee} = values;
    const discount = OrderService.getDiscountData({uom, value});
    return {
      surcharges: otherRevenues,
      discount: discount,
      codFee: codFee ? toNumberPrice(codFee) : 0,
    };
  };

  const onValuesChange = useCallback(async (values: FormValues) => {
    try {
      spinner.show();
      const data = await OrderService.fetchCalculateOrderTotalPrice({
        ...params,
        ...getFormValues(values),
      });
      setTotalData({
        paymentRequire: data.paymentRequire,
        totalAmount: data.totalAmount,
        totalProductAmount: data.totalProductAmount,
        totalSurcharge: data.totalSurcharge,
      });
    } catch (error) {
      console.log('[ERROR] fetchCalculateTotalPrice', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  const onHandleCreatedOrUpdatedOrder = async (
    data: CreateOrUpdateOrderType,
  ) => {
    NavigationService.replace(TransactionScreenID.ShippingOrderDetails, {
      ...data,
      isProcessing: true,
    });
  };

  const createOrUpdateOrder = async (
    values: FormValues,
    prePaid: number | undefined,
    shippingPaymentType: ShippingPaymentMethodType,
  ) => {
    try {
      spinner.show();
      const {type, products, priceId, guestId} = params;
      let order: CreateOrUpdateOrderType;
      const response = await OrderService.fetchCreateOrder({
        ...getFormValues(values),
        type,
        products,
        priceId,
        guestId,
        payments: [],
      });
      order = response.data;

      if (typeof prePaid === 'number') {
        const response = await updatePaymentOrder(
          order,
          prePaid,
          shippingPaymentType,
        );
        order = response.data;
      }

      dialog.show({
        type: 'Success',
        message: 'Đơn hàng đã được tạo thành công',
        canCloseByBackdrop: false,
        onModalConfirm: () => onHandleCreatedOrUpdatedOrder(order),
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateOrder', error);
    } finally {
      spinner.dismiss();
    }
  };

  const updatePaymentOrder = async (
    data: CreateOrUpdateOrderType,
    prePaid: number,
    shippingPaymentType: ShippingPaymentMethodType,
  ) => {
    let payment;
    if (prePaid > 0) {
      payment = OrderService.getPaymentData(
        selectedPaymentMethod.current?.value as string,
        toStringPrice(prePaid),
        data.paymentRequire,
      );
    }

    const values = OrderService.parseDataUpdateShippingPaymentOrder({
      ...data,
      paid: prePaid,
    });
    return await OrderService.fetchUpdateShippingPaymentOrder({
      ...values,
      payments: payment ? [payment] : [],
      newStatus: 0,
      //@ts-ignore
      paymentType: shippingPaymentType,
    });
  };

  const onSelectPaymentMethod = useCallback(
    async (data: PaymentMethodSelectedData, values: FormValues) => {
      selectedPaymentMethod.current = data;
      if (data.type === 'paidlater' || data.type === 'cod') {
        if (data.type === 'paidlater') {
          await createOrUpdateOrder(
            values,
            0,
            ShippingPaymentMethodType.PaidLater,
          );
        } else {
          await createOrUpdateOrder(values, 0, ShippingPaymentMethodType.Cod);
        }
      } else {
        modalRef.current?.open();
      }
    },
    [],
  );

  const onShippingModalHide = useCallback(async (value: number) => {
    if (formValues.current) {
      await createOrUpdateOrder(
        formValues.current,
        value,
        ShippingPaymentMethodType.Others,
      );
    }
  }, []);

  const onSubmit = useCallback((values: FormValues) => {
    formValues.current = values;
    showBottomSheet(
      <PaymentMethodBottomSheet
        useCod
        usePaidLater
        value=""
        onSelect={data => onSelectPaymentMethod(data, values)}
      />,
    );
  }, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thanh toán"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Form
          paymentRequire={totalData.paymentRequire}
          totalSurcharge={totalData.totalSurcharge}
          totalProductAmount={totalData.totalProductAmount}
          onSubmit={onSubmit}
          onValuesChange={onValuesChange}
        />
      </KeyboardAwareScrollView>
      <ShippingPaidModal onDone={onShippingModalHide} ref={modalRef} />
    </View>
  );
};

export default ShiipingCheckout;
