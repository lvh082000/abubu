import Text from 'components/Text';
import React, {useCallback, useState} from 'react';
import {View, Image} from 'react-native';
import {l, c} from 'styles/shared';
import styles from './styles';
import Button from 'components/Button';
import DotPagination from 'components/DotPagination';
import AnimatedGradient from './components/AnimatedGradient';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import DeviceHelper from 'config/DeviceHelper';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {AuthScreenID} from 'navigation/AuthNavgation';

type PageItem = {
  image: number;
  description: string;
};

const data: Array<PageItem> = [
  {
    image: require('../../assets/images/intro_1.png'),
    description:
      'Dễ dàng quản lý kinh doanh, hàng hóa và giám sát hàng tồn kho',
  },
  {
    image: require('../../assets/images/intro_2.png'),
    description:
      'Quản lý số liệu bán hàng và theo dõi tình hinh kinh doanh. Tham gia vào cộng đồng ABUBU World để nâng cao doanh số mà không tốn chi phí',
  },
  {
    image: require('../../assets/images/intro_3.png'),
    description: 'Ứng dụng công nghệ vượt trội và sử dụng trên mọi nền tảng',
  },
];

const Intro = () => {
  const [activeIndex, setIndex] = useState(0);
  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
  });

  const onIndexChange = useCallback((index: number) => {
    setIndex(index);
  }, []);

  const goRegister = () => {
    NavigationService.pushToScreen(RootScreenID.Auth, {
      screen: AuthScreenID.Register,
    });
  };

  const goLogin = () => {
    NavigationService.pushToScreen(RootScreenID.Auth, {
      screen: AuthScreenID.Login,
    });
  };

  useAnimatedReaction(
    () => Math.floor(translationX.value / DeviceHelper.width),
    index => runOnJS(onIndexChange)(index),
  );

  const renderItem = (item: PageItem, index: number) => {
    return (
      <View style={styles.itemContainer} key={index}>
        <Image source={item.image} />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedGradient offsetX={translationX} activeIndex={activeIndex} />
      <Animated.ScrollView
        bounces={false}
        onScroll={scrollHandler}
        horizontal={true}
        contentContainerStyle={[
          styles.contentContainer,
          {width: DeviceHelper.width * data.length},
        ]}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {data.map(renderItem)}
      </Animated.ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.appName}>ABUBU.VN</Text>
      </View>
      <View style={styles.footerContainer}>
        <DotPagination activeIndex={activeIndex} length={data.length} />
        <Button
          onPress={goRegister}
          widgetStyles={{container: [l.mt30, {alignSelf: 'stretch'}]}}
          title="ĐĂNG KÝ SỬ DỤNG ABUBU"
        />
        <Button
          onPress={goLogin}
          widgetStyles={{
            container: [
              l.mt20,
              {
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: c.white,
              },
            ],
            text: {color: c.white},
          }}
          title="ĐĂNG NHẬP"
        />
      </View>
    </View>
  );
};

export default Intro;
