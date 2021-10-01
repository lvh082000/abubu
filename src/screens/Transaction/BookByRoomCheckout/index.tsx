import {GradientHeader} from 'components/Header';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import Form from './components/Form';
import {RouteProp} from '@react-navigation/native';
import {
  TransactionScreenID,
  TransactionStackParams,
  TransactionTabScreenID,
} from 'navigation/TransactionNavigation';
import {
  BookByRoomOrderStatusType,
  BookByRoomCheckoutFormValues as FormValues,
  TotalCheckoutType,
} from 'types/Properties';
import {OrderService} from 'services/OrderService';
import {useSpinner} from 'components/Spinner';
import {l} from 'styles/shared';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDialog} from 'components/Dialog';
import NavigationService from 'services/NavigationService';
import {DrawerScreenID, RootScreenID} from 'navigation/types';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.BookByRoomCheckout
  >;
}

const BookByRoomCheckout = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const [totalData, setTotalData] = useState<TotalCheckoutType>({
    totalAmount: params.totalAmount,
    paymentRequire: params.paymentRequire,
    totalProductAmount: params.totalProductAmount,
    totalSurcharge: params.totalSurcharge,
  });

  const getFormValues = (values: FormValues) => {
    const {otherRevenues, uom, value} = values;
    const discount = OrderService.getDiscountData({uom, value});
    return {
      surcharges: otherRevenues,
      discount: discount,
    };
  };

  const onValuesChange = useCallback(
    async (values: FormValues) => {
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
    },
    [params],
  );

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        spinner.show();
        const payment = OrderService.getPaymentData(
          values.paymentMethod,
          values.paid,
          totalData.paymentRequire,
        );

        const body = {
          ...getFormValues(values),
          products: params.products,
        };

        await OrderService.fetchUpdateBookByRoomPaymentOrder({
          ...body,
          id: params.id as number,
          payments: [payment],
          newStatus: BookByRoomOrderStatusType.Success,
        });

        dialog.show({
          type: 'Success',
          message: 'Đơn hàng đã được thanh toán thành công',
          canCloseByBackdrop: false,
          onModalConfirm: () =>
            NavigationService.replace(RootScreenID.MainDrawer, {
              screen: DrawerScreenID.Transaction,
              params: {
                screen: TransactionTabScreenID.BookByRoom,
              },
            }),
        });
      } catch (error) {
        console.log('[ERROR] fetchCreateOrder', error);
      } finally {
        spinner.dismiss();
      }
    },
    [totalData],
  );

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thanh toán"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={[l.flex]}
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
    </View>
  );
};

export default BookByRoomCheckout;
