import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {PlusIcon} from 'components/SharedIcons';

interface Props {
  isSelected: boolean;
  onPress: () => void;
}
export const SelectedButton = React.memo(({isSelected, onPress}: Props) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[l.py10, {backgroundColor: c.green800}]}>
      <View style={[l.flexRow, l.flexCenter, {paddingBottom: bottom}]}>
        <Text style={[t.h5LG, t.bold, {color: c.white}]}>
          {isSelected ? `Hoàn tất` : `Thêm mới`}
        </Text>
        {isSelected && (
          <VectorIcon
            color={c.white}
            type={IconType.entypo}
            name="arrow-right"
            style={l.ml10}
          />
        )}
        {!isSelected && <PlusIcon style={l.ml10} size={18} />}
      </View>
    </TouchableOpacity>
  );
});
