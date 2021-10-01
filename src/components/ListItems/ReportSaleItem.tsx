import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {l, t, c} from 'styles/shared';

interface SaleReportItemProps {
  title: string;
  description: string;
  iconName: string;
  iconType: IconType;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.alignCtr,
    borderWidth: 2,
    borderColor: c.green800,
    ...l.px10,
    ...l.py10,
    borderRadius: 15,
    ...l.mt20,
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

export const SaleReportItem = React.memo(
  ({title, description, iconName, iconType, onPress}: SaleReportItemProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={onPress}>
        <View style={styles.iconContainer}>
          <VectorIcon
            size={24}
            color={c.white}
            name={iconName}
            type={iconType}
          />
        </View>
        <View style={l.flex}>
          <Text style={[t.bold, t.h5, l.mb5]}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);
