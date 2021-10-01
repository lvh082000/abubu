import Text from 'components/Text';
import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {l, t, c} from 'styles/shared';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {useAppSelector} from 'hooks/useRedux';
import {PricesSelector} from 'store/Product';

interface Props {
  onPress?: () => void;
  value: number;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    backgroundColor: c.grey1000,
    ...l.px20,
    ...l.py10,
  },
  viewTitleColumn: {
    ...l.flex,
  },
  textTitleColumn: {
    ...t.bold,
    ...t.h5,
  },
});

const Header = ({value, onPress}: Props) => {
  const data = useAppSelector(PricesSelector());

  const title = useMemo(() => {
    if (value === -1) {
      return 'Giá bán chung';
    }
    const item = data.find(v => v.id === value);
    if (item) {
      return item.name;
    }
    return 'Giá bán chung';
  }, [data, value]);

  return (
    <View style={styles.container}>
      <View style={{width: 120}}>
        <Text style={styles.textTitleColumn}>Tên hàng</Text>
      </View>
      <View style={{width: 100}}>
        <Text style={[styles.textTitleColumn]}>Giá vốn</Text>
      </View>
      <TouchableOpacity
        style={[styles.viewTitleColumn, l.flexRow, l.alignCtr]}
        onPress={onPress}>
        <Text style={[styles.textTitleColumn, t.textRight]}>{title}</Text>
        <VectorIcon
          type={IconType.antDesign}
          name="caretright"
          size={12}
          color={c.green800}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Header);
