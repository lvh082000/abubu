import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import Text from 'components/Text';
import {ReportScreenID, ReportStackParams} from 'navigation/ReportNavigation';
import React from 'react';
import {FlatList, View} from 'react-native';
import {generateArray, toStringPrice} from 'services/UtilService';
import {ContainerStyles} from 'styles/elements';
import {c, l, t} from 'styles/shared';
import {UserItem} from '../components/UserItem';

interface Props {
  route: RouteProp<ReportStackParams, ReportScreenID.SalesReportDetails>;
}

const data = generateArray(2);

const SalesReportDetails = ({route: {params}}: Props) => {
  const renderUser = ({item, index}: {item: any; index: number}) => {
    return <UserItem item={item} index={index} onItemPress={() => {}} />;
  };

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="03/09/2021"
      />

      <Text style={[l.ml20, t.bold, l.py10]}>
        {params?.title === 'doanh thu' ? 'DOANH THU: ' : 'LỢI NHUẬN GỘP: '}
        <Text style={[{color: c.blue500}]}>{toStringPrice(2000000)}đ</Text>
      </Text>

      <View style={[{backgroundColor: c.grey1000}]}>
        <Text style={[l.ml20, l.py10, {color: c.black200}]}>2 đơn hàng</Text>
      </View>

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderUser}
        keyExtractor={(_, index) => index.toString()}
        data={data}
      />
    </View>
  );
};

export default SalesReportDetails;
