import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import LinearGradient from 'react-native-linear-gradient';
import {l, c, t} from 'styles/shared';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LogoWithText} from 'components/Logo';
import Button from 'components/Button';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {
  fetchGetCurrentStore,
  GetCurrentStorePrefix,
  GetMyStores,
} from 'store/Me';
import {StoreType} from 'types/Responses/FetchGetProfileResponse';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import NavigationService from 'services/NavigationService';
import {DrawerScreenID, RootScreenID} from 'navigation/types';
import {useSpinner} from 'components/Spinner';

const NextIcon = () => {
  return (
    <VectorIcon
      size={20}
      type={IconType.entypo}
      name={'arrow-right'}
      color={c.green800}
      style={{marginTop: 2, marginLeft: 3}}
    />
  );
};

const SelectShop = () => {
  const spinner = useSpinner();
  const dispatch = useAppDispatch();
  const {top} = useSafeAreaInsets();
  const stores = GetMyStores();
  const myStore = stores.find(v => v.owner);
  const otherStores = stores.filter(v => !v.owner);

  const onNext = useCallback((store: StoreType | undefined) => {
    if (store) {
      dispatch(fetchGetCurrentStore(store.id));
    } else {
      NavigationService.resetToScreen(RootScreenID.MainDrawer, {
        screen: DrawerScreenID.Home,
        params: {firstTime: true},
      });
    }
  }, []);

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      NavigationService.resetToScreen(RootScreenID.MainDrawer);
    });
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  useThunkCallbackAction(GetCurrentStorePrefix, onSuccess, onError, onLoad);

  const renderStore = (item: StoreType, index: number) => {
    const isLast = index === otherStores.length - 1;
    return (
      <Button
        onPress={() => onNext(item)}
        key={index}
        widgetStyles={{container: isLast ? l.mb0 : l.mb20}}
        rightComponent={<NextIcon />}
        title={item.name}
      />
    );
  };

  return (
    <View style={ContainerStyles}>
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={c.primaryGradient}
        style={l.flex}>
        <View style={[l.flex, l.mx20, {paddingTop: top + 30}]}>
          <LogoWithText />
          <View style={[l.mt50]}>
            <Button
              onPress={() => onNext(myStore)}
              rightComponent={<NextIcon />}
              title="Đăng nhập là chủ cửa hàng"
            />
            {otherStores.length > 0 && (
              <>
                <Text style={[l.mt30, l.mb20, t.h5, {color: c.white}]}>
                  Chọn vào cửa hàng bên dưới để đăng nhập nếu là nhân viên của
                  cửa hàng đó:
                </Text>
                {otherStores.map(renderStore)}
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SelectShop;
