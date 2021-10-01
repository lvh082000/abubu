import ActionButton from 'components/ActionButton';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';
import {PartnerType} from 'types/Properties';

interface Props {
  numberOfItems: number;
  totalTrans: number;
  type: PartnerType;
  totalRefund: number;
}

const CustomerOptions = ['Tổng tiền bán', 'Tổng tiền trả hàng', 'Chênh lệch'];
const ProviderOptions = [
  'Tổng tiền nhập hàng',
  'Tổng tiền trả hàng nhập',
  'Chênh lệch',
];
const styles = StyleSheet.create({
  container: {
    ...l.justifyBtw,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.py10,
    ...l.px20,
    borderBottomColor: c.green800,
    borderBottomWidth: 1,
  },
  dotStyle: {
    right: -2,
    top: 2,
  },
});

const ListHeader = React.memo(
  ({numberOfItems, totalTrans, totalRefund, type}: Props) => {
    const options = useMemo(() => {
      if (type === 'guest') {
        return CustomerOptions;
      }
      return ProviderOptions;
    }, [type]);
    const [value, setValue] = useState(
      `${options[0]}: ${toStringPrice(totalTrans)}`,
    );

    const onSelect = useCallback(data => {
      const index = options.findIndex(v => v === data);
      switch (index) {
        case 0:
          setValue(`${data}: ${toStringPrice(totalTrans)}`);
          break;
        case 1:
          setValue(`${data}: ${toStringPrice(totalRefund)}`);
          break;
        case 2:
          setValue(`${data}: ${toStringPrice(totalTrans - totalRefund)}`);
          break;
      }
    }, []);
    return (
      <View style={styles.container}>
        <Text>{numberOfItems} giao dịch</Text>
        <ActionButton
          dotStyle={styles.dotStyle}
          style={l.flex}
          onSelect={onSelect}
          options={options}>
          <View style={[l.flexRow, l.alignCtr]}>
            <Text style={l.mr5}>{value}</Text>
            <VectorIcon
              size={22}
              type={IconType.fontAwesome}
              name="caret-down"
            />
          </View>
        </ActionButton>
      </View>
    );
  },
);

export default ListHeader;
