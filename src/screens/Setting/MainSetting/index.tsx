import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {useCallback} from 'react';
import NavigationService from 'services/NavigationService';
import {SettingScreenID} from 'navigation/SettingNavigation';
import {RootScreenID} from 'navigation/types';
import {GetCurrentStore, GetProfile} from 'store/Me';

interface ItemType {
  title: string;
  link: string;
  onlyOwner: boolean;
}

interface ItemProps {
  item: ItemType;
  onItemPress: (link: string) => void;
  index: number;
}

const data: Array<ItemType> = [
  {
    title: 'Thiết lập người dùng',
    link: SettingScreenID.ProfileSetting,
    onlyOwner: false,
  },
  {
    title: 'Thiết lập quản lý nhiều cửa hàng',
    link: SettingScreenID.ShopsManagement,
    onlyOwner: true,
  },
  {
    title: 'Thiết lập cửa hàng',
    link: SettingScreenID.ShopSetting,
    onlyOwner: true,
  },
  {
    title: 'Thiết lập quản lý',
    link: SettingScreenID.ManagementSetting,
    onlyOwner: true,
  },
  {
    title: 'Thiết lập thông báo',
    link: SettingScreenID.NotificationSetting,
    onlyOwner: false,
  },
  {
    title: 'Đổi mật khẩu',
    link: SettingScreenID.ChangePassword,
    onlyOwner: false,
  },
];

const MenuItem = React.memo(({item, index, onItemPress}: ItemProps) => {
  const onPress = () => {
    onItemPress(item.link);
  };
  return (
    <GradientButton
      onPress={onPress}
      title={item.title}
      widgetStyles={{container: [l.mx20, index === 0 ? l.mt30 : l.mt20]}}
    />
  );
});

const MainSetting = () => {
  const me = GetProfile();
  const store = GetCurrentStore();

  const isOwner = useMemo(() => {
    if (me && store) {
      const current = me.stores.find(v => v.id === store.id);
      return current && current.owner;
    }
    return false;
  }, []);

  const onItemPress = useCallback((link: string) => {
    NavigationService.pushToScreen(RootScreenID.Setting, {
      screen: link,
    });
  }, []);

  const renderItem = (item: ItemType, index: number) => {
    if (item.onlyOwner && !isOwner) {
      return null;
    }
    return (
      <MenuItem
        onItemPress={onItemPress}
        index={index}
        item={item}
        key={index}
      />
    );
  };
  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useDrawer
        title="Cài đặt"
      />
      {data.map(renderItem)}
    </View>
  );
};

export default MainSetting;
