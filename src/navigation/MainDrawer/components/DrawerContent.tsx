import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useDialog} from 'components/Dialog';
import Text from 'components/Text';
import {useAppDispatch, useAppSelector} from 'hooks/useRedux';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavigationService from 'services/NavigationService';
import {logout as AuthenticationLogout} from 'store/Authentication';
import {
  CurrentStoreSelector,
  logout as ProfileLogout,
  ProfileSelector,
} from 'store/Me';
import {
  appOptionList,
  peopleOptionList,
  revenueOptionList,
  storeManagerOptionList,
  storeOptionList,
} from './data';
import Option from './Option';
import styles from './styles';
import {l, c} from 'styles/shared';
import {NonAvatar} from 'components/Avatar';
import NetImage from 'components/NetImage';

const Profile = React.memo(() => {
  const me = useAppSelector(ProfileSelector());
  if (!me) {
    return null;
  }

  const renderImage = () => {
    const isNetImage = me.avatar?.startsWith('http');
    if (isNetImage) {
      return <NetImage style={styles.avatar} source={{uri: me.avatar}} />;
    }
    return (
      <View style={[styles.avatar, {backgroundColor: c.white}]}>
        <NonAvatar type="circle" size={40} name={me.fullName} />
      </View>
    );
  };

  return (
    <View style={[styles.sectionInfo, l.pt10, l.flexRow, l.alignCtr, l.pl15]}>
      {renderImage()}
      <View style={l.ml10}>
        <Text style={styles.textName}>{me.fullName}</Text>
        <Text style={styles.textRole}>Cấp quản lý</Text>
      </View>
    </View>
  );
});

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {top} = useSafeAreaInsets();
  const dialog = useDialog();
  const dispatch = useAppDispatch();
  const store = useAppSelector(CurrentStoreSelector());

  const onLogout = useCallback(() => {
    NavigationService.resetToScreen(RootScreenID.Intro);
    dispatch(AuthenticationLogout());
    dispatch(ProfileLogout());
  }, []);

  const onPress = useCallback(
    (link: string | undefined, screen: string | undefined) => {
      props.navigation.closeDrawer();

      if (!link) {
        dialog.show({
          type: 'Confirmation',
          message: 'Bạn có muốn đăng xuât?',
          title: 'Xác Nhận',
          onModalConfirm: onLogout,
        });
      } else {
        if (link === DrawerScreenID.Home || link === DrawerScreenID.Setting) {
          props.navigation.navigate(link);
        } else {
          if (store) {
            props.navigation.navigate(link, {screen});
          } else {
            dialog.show({
              type: 'Error',
              message: 'Vui lòng thiết lập cửa hàng để tiếp tục',
            });
          }
        }
      }
    },
    [store],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      bounces={false}>
      <View style={{paddingTop: top}}>
        <Profile />

        <View style={styles.sectionOption}>
          {storeOptionList.map(option => (
            <Option onPress={onPress} key={option.id} item={option} />
          ))}
        </View>

        <View style={styles.sectionOption}>
          {storeManagerOptionList.map(option => (
            <Option onPress={onPress} key={option.id} item={option} />
          ))}
        </View>

        <View style={styles.sectionOption}>
          {peopleOptionList.map(option => (
            <Option onPress={onPress} key={option.id} item={option} />
          ))}
        </View>

        <View style={styles.sectionOption}>
          {revenueOptionList.map(option => (
            <Option onPress={onPress} key={option.id} item={option} />
          ))}
        </View>

        <View style={styles.sectionOption}>
          {appOptionList.map(option => (
            <Option onPress={onPress} key={option.id} item={option} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DrawerContent;
