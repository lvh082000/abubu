import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {GradientHeader} from 'components/Header';
import OrderInfo, {OrderInfoRow} from '../components/OrderInfo';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {useFetch} from 'hooks/useFetch';
import {ImportProductDetailsType} from 'types/Responses/FetchGetImportProductDetails';
import {OrderService} from 'services/OrderService';
import {RouteProp} from '@react-navigation/native';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import LoadingView from 'components/LoadingView';
import {OrderedProductType} from 'types/Responses/FetchGetOrderDetailsResponse';
import Button from 'components/Button';
import NavigationService from 'services/NavigationService';
import {ImportStatusType, OrderType} from 'types/Properties';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ImportProductDetails
  >;
}

const ImportProductDetails = ({route: {params}}: Props) => {
  const {isLoading, data} = useFetch<ImportProductDetailsType>(
    OrderService.fetchGetImportProductDetails,
    {
      params: params.id,
    },
  );

  const onCheckout = useCallback(() => {
    NavigationService.pushToScreen(
      TransactionScreenID.ImportProductCheckout,
      data,
    );
  }, [data]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (!data) {
      return null;
    }
    return (
      <View style={[l.flex, l.justifyBtw]}>
        <View style={l.flex}>
          <CustomerOrderDetails
            createdBy={data.actorName}
            description={`Đơn hàng trực tiếp: ${toFormatDate(data.createdAt)}`}
            customer={data.providerName}
          />
          <OrderInfo
            total={data.totalAmount}
            products={data.products as OrderedProductType[]}>
            <OrderInfoRow
              title="Giảm giá phiếu nhập"
              value={toStringPrice(data.discount)}
            />
            <OrderInfoRow
              title="Cần trả NCC"
              value={toStringPrice(data.paymentRequire)}
            />
            <OrderInfoRow title="Đã trả NCC" value={toStringPrice(data.paid)} />
          </OrderInfo>
        </View>

        {data.status !== ImportStatusType.Done && (
          <View style={[l.px20, l.mb50]}>
            <Button
              onPress={onCheckout}
              variant="primary"
              size="lg"
              title="THANH TOÁN"
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title={params.code}
        useBack
        rightComponent={
          <OrderDetailsHeaderActions
            useDelete={data?.status !== ImportStatusType.Cancel}
            orderId={params.id}
            type={OrderType.Import}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default ImportProductDetails;
