import {ContainerItem} from 'components/ListItems/ContainerItem';
import Text from 'components/Text';
import React from 'react';
import {FlatList, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {}

const data = [
  {
    title: 'Doanh thu(1)',
    description: 'Doanh thu không tính thuế. chiết khấu và trả hàng',
    money: toStringPrice(7000000),
  },
  {
    title: 'Giảm trừ doanh thu(2)',
    description: 'Chiết khấu + Giá trị hàng trả lại',
    money: toStringPrice(0),
  },
  {
    title: 'Doanh thu thuần(3=1-2)',
    description: '',
    money: toStringPrice(7000000),
  },
  {
    title: 'Giá vốn hàng hóa(4)',
    description: 'Giá vốn xuất kho + Giá nhập kho hàng trả lại',
    money: toStringPrice(3000000),
  },
  {
    title: 'Lợi nhuận gộp(5=3-4)',
    description: '',
    money: toStringPrice(4000000),
  },
  {
    title: 'Chi phí(6)',
    description: 'Phí phải trả cho đối tác giao hàng',
    money: toStringPrice(3000000),
  },
  {
    title: 'Thu nhập khác(7)',
    description: 'Từ phiếu thu khác có HTKD, thu từ phía trả hàng',
    money: toStringPrice(0),
  },
  {
    title: 'Chi phí khác(8)',
    description: 'Từ phiếu thu khác có HTKD',
    money: toStringPrice(0),
  },
  {
    title: 'Lợi nhuận khác(9=7-8)',
    description: 'Doanh thu không tính thuế, chiếu khấu và trả hàng',
    money: toStringPrice(0),
  },
  {
    title: 'Lợi nhuận ròng(10=5-6)',
    description: '',
    money: toStringPrice(3000000),
  },
  {
    title: 'Lợi nhuận thuần(11=10+9)',
    description: '',
    money: toStringPrice(3000000),
  },
];

export const RevenueReport = React.memo(({}: Props) => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <ContainerItem>
        <View style={[l.flex]}>
          <Text>{item.title}</Text>
          <Text style={[t.pSM, {color: c.black200}]}>{item.description}</Text>
        </View>
        <Text style={[t.bold, {width: 80, maxWidth: 100}, t.textRight]}>
          {item.money}
        </Text>
      </ContainerItem>
    );
  };

  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      data={data}
      ListHeaderComponent={
        <Text style={[t.textCtr, l.py10, {backgroundColor: c.grey200}, t.bold]}>
          BÁO CÁO KẾT QUẢ KINH DOANH
        </Text>
      }
    />
  );
});
