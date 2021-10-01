import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import Text from 'components/Text';
import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {c, l} from 'styles/shared';

interface OptionType {
  title: string;
  isDefault: boolean;
}

interface ItemProps extends OptionType {
  index: number;
  onItemPress: () => void;
}

const data: Array<OptionType> = [
  {
    title: 'Shop quần áo',
    isDefault: false,
  },
  {
    title: 'Cửa hàng ăn uống',
    isDefault: false,
  },
  {
    title: 'Saigon Mart',
    isDefault: false,
  },
  {
    title: 'Shop giày dép',
    isDefault: true,
  },
];

const OptionItem = React.memo(
  ({title, isDefault, index, onItemPress}: ItemProps) => {
    const onPress = () => {
      onItemPress();
    };
    return (
      <View style={[l.flexRow, l.mx20]}>
        <GradientButton
          onPress={onPress}
          title={title}
          widgetStyles={{
            container: [l.flex, index === 0 ? l.mt30 : l.mt20],
          }}
        />
        <TouchableOpacity
          style={[l.justifyEnd, l.ml5, {width: 120}, l.alignEnd]}
          onPress={() => {}}
          activeOpacity={0.7}>
          <Text style={{color: isDefault ? c.blue600 : c.black100}}>
            {isDefault ? 'Mặc định' : 'Đặt làm mặc định'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

const ShopsManagement = () => {
  const onItemPress = useCallback(() => {}, []);

  const renderItem = (item: OptionType, index: number) => {
    return (
      <OptionItem
        onItemPress={onItemPress}
        index={index}
        title={item.title}
        isDefault={item.isDefault}
        key={index}
      />
    );
  };
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thiết lập quản lý nhiều cửa hàng"
      />
      {data.map(renderItem)}
    </View>
  );
};

export default ShopsManagement;
