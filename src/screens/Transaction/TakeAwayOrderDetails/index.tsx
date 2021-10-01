import {GradientHeader} from 'components/Header';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import OrderInfo, {
  OrderInfoRow,
  OrderInfoOtherRevenues,
  OrderInfoPaid,
} from '../components/OrderInfo';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import NavigationService from 'services/NavigationService';
import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {l} from 'styles/shared';
import {RouteProp} from '@react-navigation/native';
import {useFetch} from 'hooks/useFetch';
import {OrderService} from 'services/OrderService';
import {OrderDetailsType} from 'types/Responses/FetchGetOrderDetailsResponse';
import LoadingView from 'components/LoadingView';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';
import {TakeAwayOrderStatusType, OrderType} from 'types/Properties';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.TakeAwayOrderDetails
  >;
}

const TakeAwayOrderDetails = ({route: {params}}: Props) => {
  const {isLoading, data} = useFetch<OrderDetailsType>(
    OrderService.fetchGetOrderDetails,
    {
      params: params.id,
    },
  );

  const onPayMore = useCallback(() => {
    NavigationService.pushToScreen(TransactionScreenID.PayBill, {
      ...data,
      type: OrderType.TakeAway,
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
          <OrderInfo total={data.total} products={data.products}>
            <OrderInfoRow
              title="Giảm giá hóa đơn"
              value={toStringPrice(data.discountValue)}
            />
            <OrderInfoOtherRevenues data={data.surcharges} />

            <OrderInfoRow
              title="Khách cần trả"
              value={toStringPrice(data.paymentRequire)}
            />
            <OrderInfoPaid value={data.paid} onPress={onPayMore} />
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
        useBack
        title={params.code}
        rightComponent={
          <OrderDetailsHeaderActions
            useDelete={data?.status !== TakeAwayOrderStatusType.Cancel}
            orderId={params.id}
            type={OrderType.TakeAway}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default TakeAwayOrderDetails;
