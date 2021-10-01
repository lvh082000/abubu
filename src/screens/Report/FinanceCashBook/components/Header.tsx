import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {}

const styles = StyleSheet.create({
  container: {
    ...l.mx20,
    ...l.py10,
    ...l.px20,
    ...l.flexRow,
    ...l.flexCenter,
    ...l.mb20,
    borderWidth: 1,
    borderColor: c.green800,
    borderRadius: 5,
  },
  iconContainer: {
    ...l.flexCenter,
    ...l.mr10,
    width: 40,
    height: 40,
    backgroundColor: c.green800,
    borderRadius: 20,
  },
});

export const Header = React.memo(({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <VectorIcon
          size={24}
          color={c.white}
          name="calculate"
          type={IconType.material}
        />
      </View>

      <View style={[l.ml15]}>
        <Text style={[t.bold, t.h5LG]}>TỒN QUỸ CUỐI KỲ</Text>
        <Text style={[t.bold, {color: c.blue500}]}>
          {toStringPrice(9000000)}
        </Text>
      </View>
    </View>
  );
});
