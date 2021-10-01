import Text from 'components/Text';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {l, c, t} from 'styles/shared';

const NoDataView = React.memo(
  ({title, style}: {title: string; style?: StyleProp<ViewStyle>}) => {
    return (
      <View style={[l.flex, l.flexCenter, style]}>
        <Text style={[t.h4SM, {color: c.brown100}, l.mt30, t.textCtr]}>
          {title}
        </Text>
      </View>
    );
  },
);

export default NoDataView;
