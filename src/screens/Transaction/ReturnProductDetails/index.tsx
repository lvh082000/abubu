import {RouteProp} from '@react-navigation/native';
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
import {OrderType, ReturnStatusType} from 'types/Properties';
import {RefundDetailsType} from 'types/Responses/FetchGetRefundDetailsResponse';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';
import OrderInfo, {OrderInfoPaid, OrderInfoRow} from '../components/OrderInfo';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.ReturnProductDetails
  >;
}

const ReturnProductDetails = ({route: {params}}: Props) => {
  const {isLoading, data} = useFetch<RefundDetailsType>(
    OrderService.fetchGetRefundDetails,
    {
      params: params.id,
    },
  );

  const onPayMore = useCallback(() => {
    NavigationService.pushToScreen(TransactionScreenID.PayBill, {
      ...data,
      type: OrderType.Return,
    });
  }, [data]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (data) {
      return (
        <View style={l.flex}>
          <CustomerOrderDetails
            createdBy={data.actorName}
            description={`Đơn hàng trực tiếp: ${toFormatDate(data.createdAt)}`}
            customer={data.guestName}
          />
          <OrderInfo total={data.totalPrice} products={data.products}>
            <OrderInfoRow title="Giảm giá hóa đơn" value={toStringPrice(0)} />
            <OrderInfoRow
              title="Phí trả hàng"
              value={toStringPrice(data.refundFee)}
            />
            <OrderInfoRow
              title="Phí thu khác"
              value={toStringPrice(data.otherRefund)}
            />
            <OrderInfoRow
              title="Cần trả khách"
              value={toStringPrice(data.totalPrice)}
            />
            <OrderInfoPaid
              title="Đã trả khách"
              value={data.paid}
              onPress={onPayMore}
            />
          </OrderInfo>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        title={params.code}
        useBack
        rightComponent={
          <OrderDetailsHeaderActions
            orderId={params.id}
            type={OrderType.Return}
            useDelete={data?.status !== ReturnStatusType.Cancel}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default ReturnProductDetails;
