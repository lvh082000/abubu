import Text from 'components/Text';
import React from 'react';
import {Image, View} from 'react-native';
import {l, c, t} from 'styles/shared';
export const Funds = React.memo(() => {
  return (
    <View style={[l.mx20]}>
      <View style={[l.flexCenter]}>
        <Image
          resizeMode="contain"
          style={{height: 80}}
          source={require('../../../../assets/images/logo.png')}
        />
        <Text style={[t.bold, t.h5, l.mt10]}>TỒN QUỸ CUỐI KỲ </Text>
        <Text style={[t.bold, t.h4SM, l.mt5]}>5.000.000đ</Text>
      </View>
      <View
        style={[
          l.flexRow,
          l.alignCtr,
          l.justifyBtw,
          l.mt20,
          l.py15,
          l.mb10,
          {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: c.green800,
            borderBottomColor: c.green800,
          },
        ]}>
        <View>
          <Text style={[t.bold, t.h5, {color: c.blue500}]}>TỔNG THU</Text>
          <Text style={[t.bold, t.h4, {color: c.blue500}]}>5.000.000đ</Text>
        </View>
        <View style={l.alignEnd}>
          <Text style={[t.bold, t.h5, {color: c.red800}]}>TỔNG CHI</Text>
          <Text style={[t.bold, t.h4, {color: c.red800}]}>2.000.000đ</Text>
        </View>
      </View>
      <Text style={[t.pSM, {color: c.brown100}]}>
        Tồn quỹ cuối kỳ = Tồn quỹ đầu kỳ + Tổng thu – Tổng chi
      </Text>
    </View>
  );
});
