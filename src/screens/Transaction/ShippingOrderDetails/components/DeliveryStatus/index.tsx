import {useBottomSheet} from 'components/BottomSheet';
import {
  PaymentMethodBottomSheet,
  PaymentMethodSelectedData,
} from 'components/SharedBottomSheets';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {OrderService} from 'services/OrderService';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {OrderPaymentParams} from 'types/Params';
import {ShippingOrderStatusType} from 'types/Properties';
import {ShippingOrderInfoType} from 'types/Responses/FetchGetOrderDetailsResponse';

interface ShipInfoProps {
  shipInfo: ShippingOrderInfoType;
  status: ShippingOrderStatusType;
  onFeeShipPayment?: (data: OrderPaymentParams) => void;
}

interface Props extends ShipInfoProps {
  isTakeOnStore: boolean;
}

const ShipInfo = React.memo(
  ({status, shipInfo, onFeeShipPayment}: ShipInfoProps) => {
    const {showBottomSheet} = useBottomSheet();

    const onSelectPaymentMethod = useCallback(
      (data: PaymentMethodSelectedData) => {
        const payment = OrderService.getPaymentData(
          data.value as string,
          '0',
          0,
        );
        onFeeShipPayment?.(payment);
      },
      [],
    );

    const onShowPaymentMethod = useCallback(() => {
      showBottomSheet(
        <PaymentMethodBottomSheet value="" onSelect={onSelectPaymentMethod} />,
      );
    }, []);
    const {method, account, name} = shipInfo.payment;
    return (
      <View style={[l.px20, l.py15, {backgroundColor: c.white}]}>
        <Text style={[t.h5, t.bold, l.mb10]}>
          {shipInfo.shipperName} - SĐT {shipInfo.shipperPhone}
        </Text>
        {status === ShippingOrderStatusType.Delivering && (
          <>
            <Text style={t.h5}>
              Đặt cọc:{' '}
              {toStringPrice(shipInfo.deposit > 0 ? shipInfo.deposit : 0)}
            </Text>
          </>
        )}
        {status >= ShippingOrderStatusType.Delivering && (
          <>
            <Text style={t.h5}>
              Phí giao hàng: {toStringPrice(shipInfo.fee)}
            </Text>
          </>
        )}
        {status === ShippingOrderStatusType.Success && (
          <>
            <Text style={[t.h5, l.mt5]}>
              Hình thưc thanh toán: {OrderService.getPaymentMethodName(method)}
            </Text>
            {method !== 'cash' && method !== 'cod' && (
              <Text style={[t.pSM, l.mt5, {color: c.black400}]}>
                {name} - {account}
              </Text>
            )}

            <TouchableOpacity onPress={onShowPaymentMethod} style={[l.mt10]}>
              <Text style={[t.bold, t.h5, {color: c.blue600}]}>
                Cập nhật phương thức thanh toán
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  },
);

const DeliveryStatus = ({
  shipInfo,
  status,
  isTakeOnStore,
  onFeeShipPayment,
}: Props) => {
  const statusName = useMemo(() => {
    switch (status) {
      case ShippingOrderStatusType.Exporting:
        return 'Sẵn sàng giao hàng';
      case ShippingOrderStatusType.Delivering:
        return 'Đang giao hàng';
      case ShippingOrderStatusType.Success:
        return 'Đã giao hàng';
    }
  }, [status, shipInfo]);

  if (isTakeOnStore) {
    const isDone = status === ShippingOrderStatusType.Success;
    return (
      <View style={[{backgroundColor: c.grey100}]}>
        <View style={[l.mx20, l.py15, l.flexRow, l.alignCtr]}>
          <VectorIcon
            size={20}
            color={c.green800}
            type={IconType.materialCommunity}
            name={'store'}
          />
          <Text style={[t.h5, l.ml10]}>Nhận tại cửa hàng</Text>
        </View>
        <View style={[l.px20, l.py15, {backgroundColor: c.white}]}>
          <Text style={[t.h5, t.bold, l.mb10]}>
            {isDone
              ? 'Đã giao hàng thành công'
              : ' Đang chờ khách hàng đến lấy hàng '}
          </Text>
        </View>
      </View>
    );
  }

  if (shipInfo.shipperId === -1) {
    return null;
  }

  return (
    <View style={[{backgroundColor: c.grey100}]}>
      <View style={[l.mx20, l.py15, l.flexRow, l.alignCtr]}>
        <VectorIcon
          size={20}
          color={c.green800}
          type={IconType.materialCommunity}
          name={shipInfo ? 'truck' : 'store'}
        />
        <Text style={[t.h5, l.ml10]}>{statusName}</Text>
      </View>
      {!!shipInfo && (
        <ShipInfo
          onFeeShipPayment={onFeeShipPayment}
          status={status}
          shipInfo={shipInfo}
        />
      )}
    </View>
  );
};

export default React.memo(DeliveryStatus);
