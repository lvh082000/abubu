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
import {ScrollView, View} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l, c, t} from 'styles/shared';
import {OrderInfoRow} from '../components/OrderInfo';
import Button from 'components/Button';
import {OrderService} from 'services/OrderService';
import {useSpinner} from 'components/Spinner';
import {useDialog} from 'components/Dialog';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import NavigationService from 'services/NavigationService';
import {ImportedProductType, ImportStatusType} from 'types/Properties';
import GradientButton from 'components/GradientButton';
import {OrderPaymentParams} from 'types/Params';

interface FormValues {
  paymentMethod: string;
  paid: string;
}

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ImportProductCheckout
  >;
}

const initialValues: FormValues = {
  paymentMethod: '',
  paid: '',
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
        .maxCurrency(params?.paymentRequire),
    });
  }, [params?.paymentRequire, params?.paid]);

  const handleBack = () => {
    NavigationService.replace(RootScreenID.MainDrawer, {
      screen: DrawerScreenID.Transaction,
      params: {
        screen: params.isImportProduct
          ? TransactionTabScreenID.ImportProduct
          : TransactionTabScreenID.ReturnOfImportedGoods,
      },
    });
  };

  const fetchCreateOrUpdate = async (payment?: OrderPaymentParams) => {
    try {
      spinner.show();
      let body = {
        id: params.id,
        products: params.products as ImportedProductType[],
        provider: params.provider,
        payments: payment ? [payment] : [],
        newStatus: (!!payment
          ? ImportStatusType.Done
          : ImportStatusType.Processing) as ImportStatusType,
      };

      if (params.isImportProduct) {
        await OrderService.fetchCreateOrUpdateImportProduct(body);
      } else {
        await OrderService.fetchCreateOrUpdateReturnOfImportedGood(body);
      }

      dialog.show({
        type: 'Success',
        message: `${payment ? 'Thanh toán' : 'Lưu'} thành công`,
        canCloseByBackdrop: false,
        onModalConfirm: handleBack,
      });
    } catch (error) {
      console.log('[ERROR] fetchCreateOrUpdateImportProduct', error);
    } finally {
      spinner.dismiss();
    }
  };

  const onSubmit = async (values: FormValues) => {
    const payment = OrderService.getPaymentData(
      values.paymentMethod,
      values.paid,
      params.paymentRequire,
    );
    await fetchCreateOrUpdate(payment);
  };

  const onSaveTemp = async () => {
    await fetchCreateOrUpdate();
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Thanh toán"
        useBack
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        style={[l.flex]}>
        <View style={[{backgroundColor: c.grey100}, l.pb30]}>
          <View style={[{backgroundColor: c.white}]}>
            <OrderInfoRow
              title="Tổng tiền hàng"
              value={toStringPrice(params?.totalAmount)}
            />
            <OrderInfoRow
              title="Cần trả NCC"
              value={toStringPrice(params?.paymentRequire)}
            />
          </View>
        </View>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({values, errors, touched, handleChange, handleSubmit}) => {
            const residualMoney = values.paid
              ? toNumberPrice(values.paid) - params?.paymentRequire
              : 0;
            return (
              <>
                <View style={[l.px20, l.mt30]}>
                  <CurrencyInput
                    touched={touched.paid}
                    error={errors.paid}
                    hint="Nhập số tiền trả NCC"
                    label="Tiền trả NCC"
                    value={values.paid}
                    widgetStyles={{input: t.textRight}}
                    onChangeText={handleChange('paid')}
                  />

                  <PaymentMethodSelector<FormValues> inputStyle={t.textRight} />

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

                  <Button size="lg" title="LƯU TẠM" onPress={onSaveTemp} />
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ReturnProductCheckout;
