import {RouteProp} from '@react-navigation/native';
import {PaymentMethodSelector} from 'components/CustomInputs';
import {CurrencyInput, YupExtended} from 'components/FormControls';
import {GradientHeader} from 'components/Header';
import Text from 'components/Text';
import {Formik} from 'formik';
import {
  TransactionScreenID,
  TransactionStackParams,
  TransactionTabScreenID,
} from 'navigation/TransactionNavigation';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l, c, t} from 'styles/shared';
import {OrderInfoRow} from '../components/OrderInfo';
import {OrderService} from 'services/OrderService';
import {useSpinner} from 'components/Spinner';
import {useDialog} from 'components/Dialog';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import NavigationService from 'services/NavigationService';
import GradientButton from 'components/GradientButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FormValues {
  paymentMethod: string;
  paid: string;
  refundFee: string;
  otherRefund: string;
}

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ReturnProductCheckout
  >;
}

const initialValues: FormValues = {
  paymentMethod: '',
  paid: '',
  refundFee: '',
  otherRefund: '',
};

const ReturnProductCheckout = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const validationSchema = useMemo(() => {
    return YupExtended.object().shape({
      paymentMethod: YupExtended.string().required(
        'Vui lòng chọn phương thức thanh toán',
      ),
      paid: YupExtended.string()
        .required('Vui lòng nhập số tiền khách trả')
        .currency()
        .maxCurrency(params.paymentRequire),
      refundFee: YupExtended.string().currency(),
      otherRefund: YupExtended.string().currency(),
    });
  }, [params.paymentRequire]);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Transaction,
      params: {
        screen: TransactionTabScreenID.ReturnProduct,
      },
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      spinner.show();
      const payment = OrderService.getPaymentData(
        values.paymentMethod,
        values.paid,
        params.paymentRequire,
      );
      await OrderService.fetchCreateReturnProduct({
        products: params.products,
        refundFee: toNumberPrice(values.refundFee),
        otherRefund: toNumberPrice(values.otherRefund),
        orderId: params.orderId,
        priceSetting: params.priceSetting,
        guestId: params.guestId,
        payments: [payment],
      });

      dialog.show({
        type: 'Success',
        message: 'Thanh toán thành công',
        canCloseByBackdrop: false,
        onModalConfirm: handleBack,
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateReturnProduct', error);
    } finally {
      spinner.dismiss();
    }
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Thanh toán"
        useBack
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={[{backgroundColor: c.grey100}, l.pb30]}>
          <View style={[{backgroundColor: c.white}]}>
            <OrderInfoRow
              title="Tổng giá lúc mua"
              value={toStringPrice(params.totalPrice)}
            />
            <OrderInfoRow
              title="Giảm giá lúc mua"
              value={toStringPrice(params.totalPrice - params.paymentRequire)}
            />
            <OrderInfoRow
              title="Cần trả khách"
              value={toStringPrice(params.paymentRequire)}
            />
          </View>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({values, errors, touched, handleChange, handleSubmit}) => {
            const residualMoney = values.paid
              ? toNumberPrice(values.paid) - params.paymentRequire
              : 0;
            return (
              <>
                <View style={[l.px20, l.mt30]}>
                  <CurrencyInput
                    touched={touched.paid}
                    error={errors.paid}
                    hint="Nhập số tiền trả khách"
                    label="Tiền trả khách"
                    value={values.paid}
                    widgetStyles={{input: t.textRight}}
                    onChangeText={handleChange('paid')}
                  />

                  <PaymentMethodSelector<FormValues> inputStyle={t.textRight} />

                  <CurrencyInput
                    touched={touched.refundFee}
                    error={errors.refundFee}
                    hint="Nhập phí trả hàng"
                    label="Phí trả hàng"
                    value={values.refundFee}
                    widgetStyles={{input: t.textRight}}
                    onChangeText={handleChange('refundFee')}
                  />

                  <CurrencyInput
                    touched={touched.otherRefund}
                    error={errors.otherRefund}
                    hint="Nhập hoàn trả thu khác"
                    label="Hoàn trả thu khác"
                    value={values.otherRefund}
                    widgetStyles={{input: t.textRight}}
                    onChangeText={handleChange('otherRefund')}
                  />

                  {residualMoney < 0 && (
                    <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
                      <Text style={[t.bold, t.h5LG]}>Tính vào công nợ:</Text>
                      <Text style={[t.bold, t.h5LG, {color: c.red800}]}>
                        {toStringPrice(Math.abs(residualMoney))}
                      </Text>
                    </View>
                  )}

                  <GradientButton
                    title="THANH TOÁN"
                    widgetStyles={{container: [l.mt20, l.mb20]}}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ReturnProductCheckout;
