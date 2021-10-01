import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VectorIcon, {IconType} from 'components/VectorIcon';

interface Props {
  numberOfSelected: number;
  onPress: () => void;
}
export const SelectedButton = React.memo(
  ({numberOfSelected, onPress}: Props) => {
    const {bottom} = useSafeAreaInsets();
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[l.py10, {backgroundColor: c.green800}]}>
        <View style={[l.flexRow, l.flexCenter, {paddingBottom: bottom}]}>
          <Text style={[t.h5LG, t.bold, {color: c.white}]}>
            {numberOfSelected === 0
              ? `0 sản phẩm đã chọn`
              : `Đã chọn ${numberOfSelected} sản phẩm`}
          </Text>
          {numberOfSelected > 0 && (
            <VectorIcon
              color={c.white}
              type={IconType.entypo}
              name="arrow-right"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);
