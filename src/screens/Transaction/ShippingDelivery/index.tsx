import {RouteProp} from '@react-navigation/native';
import ErrorView from 'components/ErrorView';
import {YupExtended} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useSpinner} from 'components/Spinner';
import {Formik} from 'formik';
import {useDataLoader} from 'hooks/useDataLoader';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import React, {useCallback, useMemo} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {PartnerService} from 'services/PartnerService';
import {ProfileService} from 'services/ProfileService';
import {toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {
  PermissionType,
  ShippingDeliveryFormValues as FormValues,
  ShippingOrderStatusType,
  ShippingPaymentMethodType,
} from 'types/Properties';
import {FetchGetPartnersResponse} from 'types/Responses/FetchGetPartnersResponse';
import ShippingDeliveryCustomerAddress from './components/ShippingDeliveryCustomerAddress';
import ShippingDeliveryOrderInfo from './components/ShippingDeliveryOrderInfo';
import ShippingDeliverySelectShippers from './components/ShippingDeliverySelectShippers';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ShippingDelivery
  >;
}

const validationSchema = YupExtended.object().shape({
  address: YupExtended.string().required('Vui lòng nhập tên người giao hàng'),
  paidShipper: YupExtended.string()
    .required('Vui lòng nhập số tiền trả cho người giao hàng')
    .currency(),
  shipper: YupExtended.string().required('Vui lòng lựa chọn người giao hàng'),
});

const filterParams = {
  keyword: '',
  sort: 'createdAt,desc',
  extraFilterParams: {
    startTimestamp: 1,
    endTimestamp: 1,
    type: 'shipper',
  },
  limit: 1000,
};

const ShippingDelivery = ({route: {params}}: Props) => {
  const hasReadOnlyPermission = ProfileService.canIDo(PermissionType.PartnerRO);

  const getShipperResponse = useDataLoader<FetchGetPartnersResponse>(
    hasReadOnlyPermission as boolean,
    PartnerService.fetchGetPartners,
    filterParams,
  );
  const spinner = useSpinner();

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        spinner.show();
        Keyboard.dismiss();
        const shippingData = OrderService.getShippingData(
          values,
          getShipperResponse.data,
        );
        let body = OrderService.parseDataUpdateShippingPaymentOrder(params);
        body = {
          ...body,
          shipInfo: shippingData,
        };

        const {data} = await OrderService.fetchUpdateShippingPaymentOrder({
          ...body,
          payments: [],
          newStatus: ShippingOrderStatusType.Exporting,
        });

        NavigationService.replace(TransactionScreenID.ShippingOrderDetails, {
          ...data,
          isProcessing: true,
        });
      } catch (error) {
        console.log('[ERROR] fetchUpdateShippingPaymentOrder', error);
      } finally {
        spinner.dismiss();
      }
    },
    [params, getShipperResponse.data],
  );

  const onCreateShipper = useCallback(async values => {
    try {
      spinner.show();
      await PartnerService.fetchCreateOrUpdatePartner({
        ...values,
        type: 'shipper',
      });
      getShipperResponse.reload();
    } catch (error) {
      console.log('[ERROR] onCreateShipper', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  const initialValues = useMemo(() => {
    const {weight, fee} = params.shipInfo;
    const isPaidLater =
      params.paymentType === ShippingPaymentMethodType.PaidLater;

    return {
      address: params.address,
      weight: weight ? weight.toString() : '',
      paidShipper: fee ? fee.toString() : '',
      shipper: '',
      paidCod: isPaidLater
        ? '0'
        : toStringPrice(params.paymentRequire - params.paid),
    };
  }, [params]);

  const renderContent = () => {
    if (!hasReadOnlyPermission) {
      return <ErrorView message="Bạn không có quyền để xem mục này!" />;
    }
    if (getShipperResponse.isLoading) {
      return <LoadingView />;
    }
    return (
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}>
        {({handleSubmit}) => {
          return (
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={l.flex}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <View style={l.flex}>
                <ShippingDeliveryCustomerAddress customer={params.guestName} />
                <ShippingDeliveryOrderInfo
                  paid={params.paid}
                  total={params.paymentRequire}
                />
                <ShippingDeliverySelectShippers
                  data={getShipperResponse.data}
                  onCreate={onCreateShipper}
                />
              </View>

              <GradientButton
                widgetStyles={{
                  container: [l.mt30, l.mb30, l.mx20],
                }}
                title="XONG"
                onPress={handleSubmit}
              />
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title="Chọn Giao Hàng"
        useBack
      />
      {renderContent()}
    </View>
  );
};

export default ShippingDelivery;
