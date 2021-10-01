import {GradientHeader} from 'components/Header';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import Text from 'components/Text';
import {l, t, c} from 'styles/shared';
import PayBillItem from './components/PayBillItem';
import AddButton from 'components/AddButton';
import NavigationService from 'services/NavigationService';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';
import {RouteProp} from '@react-navigation/native';
import {OrderedPaymentType} from 'types/Responses/FetchGetOrderDetailsResponse';
import NoDataView from 'components/NoDataView';
import {OrderPaymentStatusType} from 'types/Properties';

interface Props {
  route: RouteProp<TransactionStackParams, TransactionScreenID.PayBill>;
}

const PayBill = ({route: {params}}: Props) => {
  const onAdd = useCallback(() => {
    NavigationService.pushToScreen(
      TransactionScreenID.CreateOrUpdatePayBill,
      params,
    );
  }, []);

  const renderItem = (item: OrderedPaymentType, index: number) => {
    return <PayBillItem item={item} key={index} />;
  };

  const renderList = () => {
    if (params.payments.length === 0) {
      return <NoDataView title="Không có dữ liệu" />;
    }
    return (
      <>
        <View style={[l.px20, l.my20]}>
          <Text style={[t.medium, t.h5]}>
            {`Tổng ${params.payments.length} phiếu thanh toán`}
          </Text>
        </View>
        <View style={[{backgroundColor: c.grey100}, l.pt30]}>
          {params.payments.map(renderItem)}
        </View>
      </>
    );
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`Thanh toán ${params.code}`}
      />
      {renderList()}
      {params.paymentStatus !== OrderPaymentStatusType.Done && (
        <AddButton onPress={onAdd} />
      )}
    </View>
  );
};

export default PayBill;
