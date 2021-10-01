import {RouteProp} from '@react-navigation/native';
import Button from 'components/Button';
import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {GradientHeader} from 'components/Header';
import LoadingView from 'components/LoadingView';
import {useFetch} from 'hooks/useFetch';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderService} from 'services/OrderService';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {ImportStatusType, OrderType} from 'types/Properties';
import {ImportProductDetailsType} from 'types/Responses/FetchGetImportProductDetails';
import {OrderedProductType} from 'types/Responses/FetchGetOrderDetailsResponse';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';
import OrderInfo, {OrderInfoRow} from '../components/OrderInfo';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ReturnOfImportedGoodDetails
  >;
}

const ReturnOfImportedGoodDetails = ({route: {params}}: Props) => {
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
              title="Giảm giá hóa đơn"
              value={toStringPrice(data.discount)}
            />
            <OrderInfoRow
              title="NCC cần trả"
              value={toStringPrice(data.paymentRequire)}
            />
            <OrderInfoRow title="NCC đã trả" value={toStringPrice(data.paid)} />
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
            type={OrderType.ReturnOrImported}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default ReturnOfImportedGoodDetails;
