import CustomerOrderDetails from 'components/CustomerOrderDetails';
import {GradientHeader} from 'components/Header';
import OrderInfo, {
  OrderInfoOtherRevenues,
  OrderInfoPaid,
  OrderInfoRow,
} from '../components/OrderInfo';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {OrderService} from 'services/OrderService';
import {OrderDetailsType} from 'types/Responses/FetchGetOrderDetailsResponse';
import {useFetch} from 'hooks/useFetch';
import LoadingView from 'components/LoadingView';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {RouteProp} from '@react-navigation/native';
import {BookByRoomOrderStatusType, OrderType} from 'types/Properties';
import Button from 'components/Button';
import {OrderDetailsHeaderActions} from '../components/OrderDetailsHeaderActions';
import NavigationService from 'services/NavigationService';

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.BookByRoomOrderDetails
  >;
}

const BookByRoomOrderDetails = ({route: {params}}: Props) => {
  const {isLoading, data} = useFetch<OrderDetailsType>(
    OrderService.fetchGetOrderDetails,
    {
      params: params.id,
    },
  );

  const onCheckout = useCallback(() => {
    const values = {
      ...data,
      roomId: data?.locationId,
      priceId: data?.priceSetting,
      products: data?.products.map(v => {
        return {
          id: v.id,
          quantity: v.quantity,
        };
      }),
      totalProductAmount: data?.totalPrice as number,
    };
    NavigationService.pushToScreen(
      TransactionScreenID.BookByRoomCheckout,
      values,
    );
  }, [data]);

  const onPayMore = useCallback(() => {
    NavigationService.pushToScreen(TransactionScreenID.PayBill, {
      ...data,
      type: OrderType.BookByRoom,
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
            description={`????n h??ng b??n ph??ng: ${toFormatDate(
              data.createdAt,
            )}\n${data.locationName}`}
            customer={data.guestName}
          />
          <OrderInfo total={data.total} products={data.products}>
            <OrderInfoRow
              title="Gi???m gi?? h??a ????n"
              value={toStringPrice(data.discountValue)}
            />

            <OrderInfoOtherRevenues data={data.surcharges} />

            <OrderInfoRow
              title="Kh??ch c???n tr???"
              value={toStringPrice(data.paymentRequire)}
            />

            <OrderInfoRow
              title="Tr???ng th??i ????n h??ng"
              value={OrderService.getBookByRoomStatusName(data.status)}
            />
            <OrderInfoPaid
              status={data.status}
              value={data.paid}
              onPress={onPayMore}
              total={data.paymentRequire}
            />
          </OrderInfo>

          {data.status === BookByRoomOrderStatusType.Processing && (
            <View style={[l.mx20, l.mt30]}>
              <Button
                onPress={onCheckout}
                size="lg"
                variant="primary"
                title="THANH TO??N"
              />
              <Button
                widgetStyles={{container: [l.mt10, l.mb20]}}
                size="lg"
                variant="primaryOutline"
                title="CHUY???N B??N"
              />
            </View>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="M?? t??? v??? m??n h??nh n??y"
        title={params.code}
        useBack
        rightComponent={
          <OrderDetailsHeaderActions
            useDelete={data?.status === BookByRoomOrderStatusType.Processing}
            orderId={params.id}
            type={OrderType.BookByRoom}
          />
        }
      />
      {renderContent()}
    </View>
  );
};

export default BookByRoomOrderDetails;
