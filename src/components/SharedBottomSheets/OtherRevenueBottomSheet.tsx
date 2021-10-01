import {useBottomSheet} from 'components/BottomSheet';
import Text from 'components/Text';
import React, {useCallback, useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {l, c, t} from 'styles/shared';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationNext} from 'components/SharedIcons';
import {OtherRevenueType} from 'types/Properties';
import {useAppSelector} from 'hooks/useRedux';
import {OtherRevenuesSelector} from 'store/Order';
import {OrderService} from 'services/OrderService';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {OtherRevenueScreenID} from 'navigation/OtherRevenueNavigation';

interface OrtherRevenueBottomSheetProps {
  onSelect: (value: OtherRevenueType) => void;
}

interface ItemProps {
  onPress: () => void;
  onNavigate: () => void;
  item: OtherRevenueType;
}

const Item = React.memo(({onNavigate, onPress, item}: ItemProps) => {
  const title = useMemo(() => {
    return OrderService.formatUOMValueToString(item);
  }, [item]);

  return (
    <View style={[l.py15, l.alignCtr, l.justifyBtw, l.flexRow]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[t.h5LG, t.bold]}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNavigate}
        activeOpacity={0.7}
        style={[l.pl10, l.py5]}>
        <NavigationNext size={20} color={c.green800} />
      </TouchableOpacity>
    </View>
  );
});

export const OrtherRevenueBottomSheet = React.memo(
  ({onSelect}: OrtherRevenueBottomSheetProps) => {
    const {bottom} = useSafeAreaInsets();
    const {dismissBottomSheet} = useBottomSheet();
    const data = useAppSelector(OtherRevenuesSelector());

    const onAdd = useCallback(() => {
      dismissBottomSheet();
      setTimeout(() => {
        NavigationService.pushToScreen(RootScreenID.OtherRevenue, {
          screen: OtherRevenueScreenID.CreateOrUpdateOtherRevenue,
        });
      }, 300);
    }, []);

    const onNavigate = useCallback((item: OtherRevenueType) => {
      dismissBottomSheet();
    }, []);

    const onItemPress = useCallback(
      (item: OtherRevenueType) => {
        dismissBottomSheet();
        onSelect(item);
      },
      [onSelect],
    );

    const renderItem = (item: OtherRevenueType, index: number) => {
      return (
        <Item
          onPress={() => onItemPress(item)}
          onNavigate={() => onNavigate(item)}
          key={index}
          item={item}
        />
      );
    };

    return (
      <View style={[l.px20, {paddingBottom: bottom}]}>
        {data.map(renderItem)}
        <TouchableOpacity onPress={onAdd} activeOpacity={0.7} style={[l.py15]}>
          <Text style={[t.h5LG, t.bold]}>Thêm mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={dismissBottomSheet}
          activeOpacity={0.7}
          style={[l.py15]}>
          <Text style={[t.h5LG, t.bold, {color: c.blue600}]}>Đóng</Text>
        </TouchableOpacity>
      </View>
    );
  },
);
