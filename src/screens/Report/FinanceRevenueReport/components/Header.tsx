import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {}

const styles = StyleSheet.create({
  sectionLeftContainer: {
    ...l.px20,
    ...l.flexCenter,
    borderRadius: 8,
    backgroundColor: c.green800,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: c.green800,
    borderRadius: 20,
    ...l.flexCenter,
    ...l.mr10,
  },
});

export const Header = React.memo(({}: Props) => {
  return (
    <View style={[l.flexRow, l.justifyBtw, l.mx20, l.mb20]}>
      <View style={styles.sectionLeftContainer}>
        <Text style={[t.bold, t.h4SM, {color: c.white}]}>LỢI NHUẬN RÒNG</Text>
        <Text style={[t.bold, {color: c.white}]}>{toStringPrice(3000000)}</Text>
      </View>

      <View>
        <View style={[l.flexRow, l.mb5]}>
          <View style={styles.iconContainer}>
            <VectorIcon
              type={IconType.ionIcon}
              name="bar-chart"
              size={24}
              color={c.white}
            />
          </View>
          <View>
            <Text style={[t.bold, {color: c.black100}]}>DT thuần</Text>
            <Text style={[t.bold, {color: c.black1000}]}>
              {toStringPrice(7000000)}
            </Text>
          </View>
        </View>

        <View style={[l.flexRow, l.mb5]}>
          <View style={styles.iconContainer}>
            <VectorIcon
              type={IconType.material}
              name="inventory"
              size={24}
              color={c.white}
            />
          </View>
          <View>
            <Text style={[t.bold, {color: c.black100}]}>Giá vốn</Text>
            <Text style={[t.bold, {color: c.black1000}]}>
              {toStringPrice(3000000)}
            </Text>
          </View>
        </View>

        <View style={[l.flexRow]}>
          <View style={styles.iconContainer}>
            <VectorIcon
              type={IconType.entypo}
              name="database"
              size={24}
              color={c.white}
            />
          </View>
          <View>
            <Text style={[t.bold, {color: c.black100}]}>Chi phí</Text>
            <Text style={[t.bold, {color: c.black1000}]}>
              {toStringPrice(1000000)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});
