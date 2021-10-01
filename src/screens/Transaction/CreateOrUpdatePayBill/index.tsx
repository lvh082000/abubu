import {RouteProp} from '@react-navigation/native';
import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {PaymentMethodSelector} from 'components/CustomInputs';
import {CurrencyInput, YupExtended} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import {Formik} from 'formik';
import {
  TransactionScreenID,
  TransactionStackParams,
  TransactionTabScreenID,
} from 'navigation/TransactionNavigation';
import React, {useMemo} from 'react';
import {useCallback} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {OrderService} from 'services/OrderService';
import {useDialog} from 'components/Dialog';
import {useSpinner} from 'components/Spinner';
import NavigationService from 'services/NavigationService';
import {BookByRoomOrderStatusType, OrderType} from 'types/Properties';
import {toFormatDate} from 'services/UtilService';
import {DrawerScreenID, RootScreenID} from 'navigation/types';

interface FormValues {
  paid: string;
  paymentMethod: string;
}

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.CreateOrUpdatePayBill
  >;
}

const initialValues: FormValues = {
  paid: '',
  paymentMethod: '',
};

const CreateOrUpdatePayBill = ({route: {params}}: Props) => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const validationSchema = useMemo(() => {
    return YupExtended.object().shape({
      paid: YupExtended.string()
        .required('Vui lòng nhập số tiền thu từ khách')
        .currency()
        .maxCurrency(params.paymentRequire - params.paid),
      paymentMethod: YupExtended.string().required(
        'Vui lòng chọn phương thức thanh toán',
      ),
    });
  }, [params.paymentRequire, params.paid]);

  const title = useMemo(() => {
    switch (params.type) {
      case OrderType.TakeAway:
        return 'trực tiếp';
      case OrderType.BookByRoom:
        return 'bàn phòng';
      case OrderType.Return:
        return 'trả hàng';
    }
  }, [params.type]);

  const handleBack = () => {
    switch (params.type) {
      case OrderType.TakeAway:
        NavigationService.replace(RootScreenID.MainDrawer, {
          screen: DrawerScreenID.Transaction,
          params: {
            screen: TransactionTabScreenID.TakeAway,
          },
        });
        break;
      case OrderType.BookByRoom:
        NavigationService.replace(RootScreenID.MainDrawer, {
          screen: DrawerScreenID.Transaction,
          params: {
            screen: TransactionTabScreenID.BookByRoom,
          },
        });
        break;
      case OrderType.Return:
        NavigationService.replace(RootScreenID.MainDrawer, {
          screen: DrawerScreenID.Transaction,
          params: {
            screen: TransactionTabScreenID.ReturnProduct,
          },
        });
        break;
    }
  };

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      spinner.show();
      const payment = OrderService.getPaymentData(
        values.paymentMethod,
        values.paid,
        params.paymentRequire,
      );
      switch (params.type) {
        case OrderType.TakeAway:
          await OrderService.fetchUpdateTakeAwayPaymentOrder({
            id: params.id,
            payments: [payment],
          });
          break;
        case OrderType.BookByRoom:
          await OrderService.fetchUpdateBookByRoomPaymentOrder({
            id: params.id,
            payments: [payment],
            newStatus: BookByRoomOrderStatusType.Processing,
          });
          break;
        case OrderType.Return:
          await OrderService.fetchUpdateReturnProductPaymentOrder({
            id: params.id,
            payments: [payment],
            products: params.products,
          });
          break;
      }

      dialog.show({
        type: 'Success',
        message: 'Phiếu thu đã được tạo thành công',
        canCloseByBackdrop: false,
        onModalConfirm: handleBack,
      });
    } catch (error) {
      console.log('[ERROR]');
    } finally {
      spinner.dismiss();
    }
  }, []);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Lập phiếu thu"
      />
      <CustomerOrderDetails
        createdBy={params.actorName}
        description={`Đơn hàng ${title}: ${toFormatDate(params.createdAt)}`}
        customer={params.guestName}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <>
              <View style={[l.px20, l.mt30]}>
                <CurrencyInput
                  hint="Nhập số tiền thu từ khách"
                  label="Số tiền"
                  value={values.paid}
                  error={errors.paid}
                  touched={touched.paid}
                  onChangeText={handleChange('paid')}
                />

                <PaymentMethodSelector<FormValues> />

                <GradientButton
                  title="HOÀN THÀNH"
                  widgetStyles={{container: [l.mt30, l.mb20]}}
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateOrUpdatePayBill;
