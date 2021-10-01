import {PlusIcon} from 'components/SharedIcons';
import Text from 'components/Text';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {l, c, t} from 'styles/shared';

const FastReturnButton = React.memo(({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[l.flexRow, l.alignCtr, l.mr20]}>
      <Text style={[t.h5, t.bold, {color: c.green800}]}>Trả Nhanh</Text>
      <PlusIcon style={l.ml5} size={14} color={c.green800} />
    </TouchableOpacity>
  );
});
export default FastReturnButton;
