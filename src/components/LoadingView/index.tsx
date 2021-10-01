import React from 'react';
import {Flow} from 'react-native-animated-spinkit';
import {View} from 'react-native';
import Text from 'components/Text';
import {l, t, c} from 'styles/shared';

interface Props {
  title?: string | undefined;
}

const LoadingView = ({title = 'Đang xử lý'}: Props) => {
  return (
    <View style={[l.flex, l.flexCenter]}>
      <Flow size={45} color={c.green800} />
      <Text style={[t.bold, t.h5, l.mt5, {color: c.green800}]}>{title}</Text>
    </View>
  );
};

export default React.memo(LoadingView);
