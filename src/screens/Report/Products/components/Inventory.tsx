import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {Image, View} from 'react-native';
import {l, c, t} from 'styles/shared';

export const Inventory = React.memo(() => {
  return (
    <View style={[l.mx20]}>
      <View style={[l.flexCenter]}>
        <VectorIcon
          color={c.green800}
          size={80}
          type={IconType.material}
          name="inventory"
        />
        <Text style={[t.bold, t.h5, l.mt10]}>TỒN KHO CUỐI KỲ</Text>
      </View>
      <View style={[l.flexRow, l.alignCtr, l.justifyBtw, l.mt10]}>
        <Text style={[t.bold, t.h4SM, l.mt5]}>Tiền: 5.000.000đ</Text>
        <Text style={[t.bold, t.h4SM, l.mt5]}>Số lượng: 12</Text>
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
          <Text style={[t.bold, t.h5, {color: c.blue500}]}>NHẬP TRONG KÌ</Text>
          <Text style={[t.bold, t.h4, {color: c.blue500}]}>5.000.000đ</Text>
        </View>
        <View style={l.alignEnd}>
          <Text style={[t.bold, t.h5, {color: c.red800}]}>XUẤT TRONG KÌ</Text>
          <Text style={[t.bold, t.h4, {color: c.red800}]}>2.000.000đ</Text>
        </View>
      </View>
      <Text style={[t.pSM, {color: c.brown100}]}>
        Giá trị tồn kho = Số lượng * Giá vốn
      </Text>
    </View>
  );
});
