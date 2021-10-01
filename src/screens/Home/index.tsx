import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import {SettingScreenID} from 'navigation/SettingNavigation';
import {RootScreenID, RootStackParams} from 'navigation/types';
import React, {useCallback, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {TourGuideZoneByPosition, useTourGuideController} from 'rn-tourguide';
import NavigationService from 'services/NavigationService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import AbubuWorld from './components/AbubuWorld';
import {MenuItems} from './components/MenuItems';
import Overview from './components/Overview';
import {RightIcons} from './components/RightIcons';
import Upgrade from './components/Upgrade';

interface Props {
  route: {
    params: {firstTime: boolean} | undefined;
  };
}

const Home = ({route: {params}}: Props) => {
  const {canStart, start, eventEmitter} = useTourGuideController();

  const showAppTour = useCallback(() => {
    if (start && canStart) {
      start();
    }
  }, [start, canStart]);

  const handleOnStop = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Setting, {
      screen: SettingScreenID.ShopSetting,
    });
  }, []);

  const onNotification = useCallback(() => {
    NavigationService.pushToScreen(RootScreenID.Notification, {});
  }, []);

  useEffect(() => {
    eventEmitter && eventEmitter.on('stop', handleOnStop);

    return () => {
      eventEmitter && eventEmitter.off('stop', handleOnStop);
    };
  }, [eventEmitter]);

  useEffect(() => {
    if (params?.firstTime && start && canStart) {
      setTimeout(() => {
        start();
      }, 300);
    }
  }, [params, canStart]);

  return (
    <View style={ContainerStyles}>
      <View style={[StyleSheet.absoluteFill, l.flexCenter]}>
        <Image source={require('../../assets/images/logo_transparent.png')} />
      </View>
      <GradientHeader
        rightComponent={
          <RightIcons
            onNotification={onNotification}
            onQuestion={showAppTour}
          />
        }
        useDrawer
        title="Trang Chủ"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={l.flex}>
        <AbubuWorld />
        <MenuItems />
        <Overview />
        <Upgrade />
      </ScrollView>

      <TourGuideZoneByPosition
        zone={8}
        isTourGuide
        width={0}
        height={0}
        top={0}
        keepTooltipPosition={true}
      />
    </View>
  );
};

export default Home;
