import Text from 'components/Text';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {c, l, t} from 'styles/shared';

export const RightButton = React.memo(
  ({title, onPress}: {title: string; onPress: () => void}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[l.mt15, l.mr5]}>
        <Text style={[t.bold, {color: c.green800}]}>{title}</Text>
      </TouchableOpacity>
    );
  },
);
