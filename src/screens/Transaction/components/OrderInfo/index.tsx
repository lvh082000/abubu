import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {OrderService} from 'services/OrderService';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {
  OtherRevenueType,
  ShippingOrderStatusType,
  TakeAwayOrderStatusType,
} from 'types/Properties';
import {OrderedProductType} from 'types/Responses/FetchGetOrderDetailsResponse';

interface OrderInfoProps {
  products: Array<OrderedProductType>;
  total: number;
  children?: JSX.Element | Array<JSX.Element>;
  onPressItem?: (item: OrderedProductType) => void;
}

interface OrderItemProps {
  onPress?: (item: OrderedProductType) => void;
  item: OrderedProductType;
}

interface OrderInfoOtherRevenuesProps {
  data: Array<OtherRevenueType>;
}

interface OrderInfoPaidProps {
  onPress?: () => void;
  value: number;
  title?: string;
}

interface PropsRow {
  title?: string;
  value?: string | JSX.Element;
}

const Row = ({
  style,
  children,
}: {
  children: Array<JSX.Element> | JSX.Element;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={[
        l.px20,
        l.flexRow,
        l.py15,
        l.alignCtr,
        l.justifyBtw,
        style,
        {borderBottomWidth: 1, borderBottomColor: c.grey100},
      ]}>
      {children}
    </View>
  );
};

export const OrderInfoRow = React.memo(({title, value}: PropsRow) => {
  return (
    <Row>
      <Text style={[t.h5, t.medium]}>{title}</Text>
      <View style={[l.flexRow, l.flex, l.justifyEnd]}>
        {typeof value === 'string' && (
          <Text style={[t.h5, t.bold, {color: c.green800}]}>{value}</Text>
        )}
        {typeof value !== 'string' && value}
      </View>
    </Row>
  );
});

export const OrderInfoOtherRevenues = React.memo(
  ({data}: OrderInfoOtherRevenuesProps) => {
    const total = useMemo(() => {
      return data.reduce((result, item) => {
        return (result += item.amount as number);
      }, 0);
    }, [data]);

    const renderItem = (item: OtherRevenueType, index: number) => {
      const title = OrderService.formatUOMValueToString(item);
      return (
        <Text style={[t.pSM, {color: c.brown400}]} key={index}>
          - {title}
        </Text>
      );
    };

    const renderItems = () => {
      if (data.length > 0) {
        return <View style={l.mt5}>{data.map(renderItem)}</View>;
      }
      return <View />;
    };

    return (
      <Row style={[l.flexCol, l.alignStart]}>
        <View style={[l.flexRow]}>
          <Text style={[t.h5, t.medium]}>Thu khác</Text>
          <View style={[l.flexRow, l.flex, l.justifyEnd]}>
            <Text style={[t.h5, t.bold, {color: c.green800}]}>
              {toStringPrice(total)}
            </Text>
          </View>
        </View>
        {renderItems()}
      </Row>
    );
  },
);

export const OrderInfoPaid = React.memo(
  ({value, onPress, title = 'Khách đã trả'}: OrderInfoPaidProps) => {
    return (
      <OrderInfoRow
        title={title}
        value={
          <TouchableOpacity
            style={[l.flexRow]}
            activeOpacity={0.7}
            onPress={onPress}>
            <Text style={[t.bold, t.h5, l.mr5, {color: c.green800}]}>
              {toStringPrice(value)}
            </Text>
            <NavigationNext color={c.green800} size={20} />
          </TouchableOpacity>
        }
      />
    );
  },
);

const OrderItem = ({item, onPress}: OrderItemProps) => {
  const _onPress = () => {
    onPress?.(item);
  };

  return (
    <TouchableOpacity
      style={[
        l.flexRow,
        l.alignStart,
        l.justifyBtw,
        l.py15,
        {borderBottomWidth: 1, borderBottomColor: c.grey100},
        l.px20,
      ]}
      activeOpacity={0.7}
      onPress={_onPress}>
      <View>
        <Text style={[t.bold, t.h5]}>{item.name}</Text>
        <Text>{item.barcode}</Text>
        <Text style={[{color: c.green800}, t.bold, l.mt5]}>
          {toStringPrice(item.price)} x {item.quantity ?? 1}
        </Text>
      </View>
      <Text style={[t.bold, t.h5, {color: c.green800}]}>
        {toStringPrice(item.price * (item.quantity ?? 1))}
      </Text>
    </TouchableOpacity>
  );
};

const OrderInfo = ({
  products,
  total,
  children,
  onPressItem,
}: OrderInfoProps) => {
  const renderOrderItem = (item: OrderedProductType, index: number) => {
    return <OrderItem item={item} key={index} onPress={onPressItem} />;
  };
  return (
    <>
      <View style={[{backgroundColor: c.grey100}, l.pb30]}>
        <View style={[{backgroundColor: c.white}]}>
          {products.map(renderOrderItem)}
        </View>
      </View>

      <View>
        <OrderInfoRow title="Tổng tiền hàng" value={toStringPrice(total)} />
        {children}
      </View>
    </>
  );
};

export default React.memo(OrderInfo);
