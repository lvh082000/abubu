import {RouteProp} from '@react-navigation/native';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import Text from 'components/Text';
import {Formik, useFormikContext} from 'formik';
import {useAndroidBack} from 'hooks/useAndroidBack';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l, t, c} from 'styles/shared';
import {ShippingOrderStatusType} from 'types/Properties';

interface FormValues {
  deposit: string;
}

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ShippingSetStakes
  >;
}

const PaidForShipperInput = ({max, min}: {min: number; max: number}) => {
  const {
    values,
    errors,
    touched,
    setFieldError,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext<FormValues>();

  const onValueChange = (value: string) => {
    setFieldValue('deposit', value, false);
    if (!touched.deposit) {
      setFieldTouched('deposit', true);
    }
    if (value.trim().length === 0) {
      setFieldError('deposit', 'Vui lòng nhập tiền người giao hàng cọc');
      return;
    }

    const numValue = parseInt(value);
    if (numValue > max || numValue < min) {
      setFieldError(
        'deposit',
        `Số tiền không được vượt quá ${toStringPrice(
          max,
        )} và lớn hơn ${toStringPrice(min)}`,
      );
    } else {
      setFieldError('deposit', ``);
    }
  };

  return (
    <Input
      editable={max !== min}
      hint="Nhập tiền người giao hàng cọc"
      label="Nhận từ người giao hàng"
      value={values.deposit}
      error={errors.deposit}
      touched={touched.deposit}
      onChangeText={onValueChange}
    />
  );
};

const ShippingSetStakes = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const maxMoneyToPay = useMemo(() => {
    return params.shipInfo.codAmount - params.shipInfo.fee;
  }, []);
  const minMoneyToPay = useMemo(() => {
    return -params.shipInfo.fee;
  }, []);
  const initialValues = useMemo(() => {
    return {
      deposit: toStringPrice(maxMoneyToPay),
    };
  }, []);

  const handleBack = useCallback(() => {
    NavigationService.replace(TransactionScreenID.ShippingOrderDetails, {
      ...params,
      isProcessing: true,
    });
  }, [params]);

  const onSubmit = useCallback(async (values: FormValues) => {
    try {
      spinner.show();
      let body = OrderService.parseDataUpdateShippingPaymentOrder(params);
      body = {
        ...body,
        shipInfo: {
          ...body.shipInfo,
          deposit: toNumberPrice(values.deposit),
        },
      };
      const {data} = await OrderService.fetchUpdateShippingPaymentOrder({
        ...body,
        payments: [],
        newStatus: ShippingOrderStatusType.Delivering,
        id: params.id,
      });
      NavigationService.replace(TransactionScreenID.ShippingOrderDetails, {
        ...data,
        isProcessing: true,
      });
    } catch (error) {
      console.log('[ERROR]', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  useAndroidBack(() => {
    handleBack();
  }, [params]);

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Đặt Cọc"
        useBack
        goBack={handleBack}
      />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({handleSubmit}) => {
          return (
            <>
              <View style={{backgroundColor: c.grey100}}>
                <View
                  style={[{backgroundColor: c.white}, l.mb20, l.px20, l.pt20]}>
                  <Text style={[t.bold, t.h5, l.mb10]}>
                    Tiền cần thu hộ: {toStringPrice(params.shipInfo.codAmount)}
                  </Text>
                  <Text style={[t.bold, t.h5, l.mb20]}>
                    Phí giao hàng {toStringPrice(params.shipInfo.fee)}
                  </Text>
                </View>
              </View>
              <View style={[l.mx20, l.mt20]}>
                <PaidForShipperInput min={minMoneyToPay} max={maxMoneyToPay} />
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

export default ShippingSetStakes;
