import {useBottomSheet} from 'components/BottomSheet';
import {
  PaymentMethodBottomSheet,
  PaymentMethodSelectedData,
} from 'components/SharedBottomSheets';
import {PlusIcon} from 'components/SharedIcons';
import {ShippingPaidModal, ShippingPaidModalRef} from 'components/SharedModals';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useRef, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {OrderService} from 'services/OrderService';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';
import {OrderPaymentParams} from 'types/Params';
import {ShippingOrderStatusType, UpdatePaymentType} from 'types/Properties';
import {OrderedPaymentType} from 'types/Responses/FetchGetOrderDetailsResponse';

interface ShippingPaidListProps {
  total: number;
  payments: Array<OrderedPaymentType>;
  codAmount: number;
  status: ShippingOrderStatusType;
  isTakeOnStore: boolean;
  paid: number;
  onAddPayment?: (data: OrderPaymentParams) => void;
  onDebtPayment?: (data: OrderPaymentParams) => void;
}

interface ShippingPaidItemProps {
  item: OrderedPaymentType;
  index: number;
  onUpdatePaymentMethod: () => void;
}

export interface ShippingPaidListRef {
  getPaidTotal: () => number;
}

const styles = StyleSheet.create({
  item: {
    ...l.py15,
    ...l.px20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    ...l.alignCtr,
  },
});

const ShippingPaidItem = React.memo(
  ({item, index, onUpdatePaymentMethod}: ShippingPaidItemProps) => {
    const inputType = item.inputType === 'COD' ? 'cod' : item.method;
    const method = item.method;
    const paymentMethod = OrderService.getPaymentMethodName(inputType);

    return (
      <View style={[styles.item, index === 0 ? l.pt10 : l.pt0]}>
        <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
          <Text style={[t.medium, t.h5]}>{paymentMethod}</Text>
          <Text style={[t.bold, t.h5, {color: c.green800}]}>
            {toStringPrice(item.amount)}
          </Text>
        </View>
        {method !== 'cash' && method !== 'cod' && (
          <Text style={[t.pSM, l.mt5, {color: c.black400}]}>
            {item.name} - {item.account}
          </Text>
        )}
        {item.inputType === 'COD' && method === 'cash' && (
          <Text style={[t.pSM, l.mt5, {color: c.black400}]}>Tiền mặt</Text>
        )}
        <Text style={[t.pSM, l.mt5, {color: c.black400}]}>
          {toFormatDate(item.createdAt)}
        </Text>
        {inputType === 'cod' && (
          <TouchableOpacity onPress={onUpdatePaymentMethod} style={[l.mt5]}>
            <Text style={[t.bold, t.h5, {color: c.blue600}]}>
              Cập nhật phương thức thanh toán
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const MoneyShipperCode = ({codAmount}: {codAmount: number}) => {
  return (
    <View style={[styles.item, l.pt0]}>
      <Text style={[t.bold, t.h5]}>
        Tiền shipper đang thu hộ COD:{' '}
        <Text style={{color: c.green800}}>{toStringPrice(codAmount)}</Text>
      </Text>
    </View>
  );
};

const ShippingPaidList = React.memo(
  ({
    total,
    codAmount,
    payments,
    status,
    paid,
    onAddPayment,
    onDebtPayment,
    isTakeOnStore,
  }: ShippingPaidListProps) => {
    const {showBottomSheet} = useBottomSheet();
    const modalRef = useRef<ShippingPaidModalRef>(null);
    const selectedPaymentMethod = useRef<PaymentMethodSelectedData | undefined>(
      undefined,
    );
    const updateType = useRef<UpdatePaymentType | undefined>(undefined);
    const isSuccess = status === ShippingOrderStatusType.Success;

    const getPaidTitle = () => {
      if (paid === 0) {
        return 'Chưa thanh toán';
      }
      if (paid >= total) {
        return 'Đã thanh toán đầy đủ';
      }
      return 'Đã thanh toán một phần';
    };

    const onSelectPaymentMethod = useCallback(
      (data: PaymentMethodSelectedData) => {
        if (updateType.current === UpdatePaymentType.UpdatePaymentCOD) {
          const payment = OrderService.getPaymentData(
            data.value as string,
            '0',
            0,
          );
          onDebtPayment?.(payment);
        } else {
          selectedPaymentMethod.current = data;
          setTimeout(() => {
            modalRef.current?.open();
          }, 300);
        }
      },
      [],
    );

    const onShowPaymentMethod = useCallback((type: UpdatePaymentType) => {
      updateType.current = type;
      showBottomSheet(
        <PaymentMethodBottomSheet value="" onSelect={onSelectPaymentMethod} />,
      );
    }, []);

    const onDone = useCallback(
      (value: number) => {
        if (selectedPaymentMethod.current) {
          const payment = OrderService.getPaymentData(
            selectedPaymentMethod.current.value as string,
            toStringPrice(value),
            0,
          );
          onAddPayment?.(payment);
        }
      },
      [onAddPayment],
    );

    const renderItem = (item: OrderedPaymentType, index: number) => {
      return (
        <ShippingPaidItem
          onUpdatePaymentMethod={() =>
            onShowPaymentMethod(UpdatePaymentType.UpdatePaymentCOD)
          }
          key={index}
          index={index}
          item={item}
        />
      );
    };

    return (
      <View
        style={[
          {
            backgroundColor: c.grey100,
            borderBottomWidth: 1,
            borderBottomColor: c.grey100,
          },
        ]}>
        <View style={[l.p20, l.flexRow, l.alignCtr, l.justifyBtw]}>
          <View style={[l.flexRow, l.alignCtr]}>
            <View style={styles.checkbox}>
              {paid >= total && (
                <VectorIcon
                  color={c.green400}
                  size={16}
                  type={IconType.materialCommunity}
                  name={'check-bold'}
                />
              )}
            </View>
            <Text style={[t.h5, l.ml10]}>{getPaidTitle()}</Text>
          </View>
        </View>
        <View style={{backgroundColor: c.white}}>
          {payments.map(renderItem)}
          {status === ShippingOrderStatusType.Success && (
            <View style={[styles.item, payments.length > 0 ? l.pt0 : l.pt20]}>
              <Text style={[t.bold, t.h5]}>
                Khách đã thanh toán:{' '}
                <Text style={{color: c.green800}}>{toStringPrice(paid)}</Text>
              </Text>
            </View>
          )}
          <View style={[styles.item, payments.length > 0 ? l.pt0 : l.pt20]}>
            <Text style={[t.bold, t.h5]}>
              Còn nợ:{' '}
              <Text style={{color: c.red800}}>
                {toStringPrice(Math.abs(total - paid))}
              </Text>
            </Text>
          </View>

          {!isTakeOnStore && status === ShippingOrderStatusType.Delivering && (
            <MoneyShipperCode codAmount={codAmount} />
          )}
          {isSuccess && paid < total && (
            <View style={[styles.item, l.alignEnd, l.pt0]}>
              <TouchableOpacity
                style={[l.flexRow, l.alignCtr]}
                onPress={() =>
                  onShowPaymentMethod(UpdatePaymentType.AddPaymentOrder)
                }
                activeOpacity={0.7}>
                <Text style={[t.h5, t.bold, {color: c.blue600}, l.mr5]}>
                  Thêm phiếu thu
                </Text>
                <PlusIcon style={{paddingTop: 2}} size={14} color={c.blue600} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ShippingPaidModal onDone={onDone} ref={modalRef} />
      </View>
    );
  },
);

export default ShippingPaidList;
