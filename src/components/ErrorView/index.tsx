import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {View} from 'react-native';
import {l, c, t} from 'styles/shared';

interface Props {
  message: string;
}

const ErrorView = React.memo(({message}: Props) => {
  return (
    <View style={[l.flex, l.flexCenter]}>
      <Text style={[t.textCtr, t.h5LG, l.mb10, {color: c.brown100}]}>
        {message}
      </Text>
      <VectorIcon
        color={c.brown100}
        size={50}
        type={IconType.material}
        name="error"
      />
    </View>
  );
});
export default ErrorView;
