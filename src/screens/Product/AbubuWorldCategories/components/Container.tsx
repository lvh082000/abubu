import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import {l} from 'styles/shared';
import {generateArray, randomNumber} from 'services/UtilService';
import Faker from 'faker';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import Sidebar from './Sidebar';
import ListItem from './List';

const products = (length: number) =>
  generateArray(length).map(item => {
    return {
      name: `Product ${item}`,
      image: 'https://via.placeholder.com/150x150?text=Hello',
    };
  });

const categories = generateArray(10).map(v => {
  const length = randomNumber(10, 20);
  return {
    name: `Category ${v}`,
    image: 'https://via.placeholder.com/150x150?text=Hello',
    products: products(length),
  };
});

const Container = () => {
  const offsetY = useSharedValue(0);
  const productListRef = useRef<ScrollView>(null);
  const layouts = useRef<LayoutRectangle[]>([]);
  const [activeIndex, setIndex] = useState<number>(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    offsetY.value = event.contentOffset.y;
  });

  const onCategoryItem = useCallback((index: number) => {
    const {y} = layouts.current[index];

    productListRef.current?.scrollTo({
      y: y,
      animated: true,
    });
  }, []);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    layouts.current = [...layouts.current, e.nativeEvent.layout];
  }, []);

  const onOffsetChange = useCallback(
    value => {
      const data = layouts.current.map(v => Math.floor(v.y));
      const y = Math.floor(value);
      const biggerData = data.filter(v => v >= y);
      const index = data.length - biggerData.length;

      setIndex(index);
    },
    [activeIndex],
  );

  useAnimatedReaction(
    () => {
      return offsetY.value;
    },
    value => runOnJS(onOffsetChange)(value),
  );

  const renderProducts = (item: any, index: number) => {
    return (
      <ListItem onLayout={onLayout} key={index} index={index} item={item} />
    );
  };

  return (
    <View style={[l.flex, l.flexRow]}>
      <Sidebar
        activeIndex={activeIndex}
        onItemPress={onCategoryItem}
        data={categories}
      />
      <Animated.ScrollView
        //@ts-ignore
        ref={productListRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}>
        {categories.map(renderProducts)}
      </Animated.ScrollView>
    </View>
  );
};

export default Container;
