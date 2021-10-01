import React, {useRef, useEffect, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {l, t, c} from 'styles/shared';
import NetImage from 'components/NetImage';
import Animated from 'react-native-reanimated';

interface Props {
  data: Array<any>;
  onItemPress: (index: number) => void;
  activeIndex: number;
}

interface SidebarItem {
  onItemPress: (index: number) => void;
  item: any;
  index: number;
  activeIndex: number;
}

const SidebarItem = React.memo(
  ({item, index, activeIndex, onItemPress}: SidebarItem) => {
    const onPress = () => {
      onItemPress(index);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          l.flexCenter,
          l.py20,
          {
            height: 120,
            backgroundColor: index === activeIndex ? c.white : c.grey1000,
          },
        ]}>
        <NetImage style={{width: 50, height: 50}} source={{uri: item.image}} />
        <Text style={[l.mt10, t.textCtr]}>{item.name}</Text>
      </TouchableOpacity>
    );
  },
);

const Sidebar = ({data, onItemPress, activeIndex}: Props) => {
  const categoryListRef = useRef<FlatList>(null);

  const onCategoryItem = useCallback(
    (index: number) => {
      // setIndex(index);
      onItemPress(index);
    },
    [onItemPress],
  );

  const renderCategory = ({item, index}: any) => {
    return (
      <SidebarItem
        onItemPress={onCategoryItem}
        key={index}
        index={index}
        item={item}
        activeIndex={activeIndex}
      />
    );
  };

  useEffect(() => {
    categoryListRef?.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
    });
  }, [activeIndex]);

  return (
    <View style={{width: 90}}>
      <FlatList
        ref={categoryListRef}
        showsVerticalScrollIndicator={false}
        renderItem={renderCategory}
        keyExtractor={(_, index) => index.toString()}
        data={data}
      />
    </View>
  );
};

export default React.memo(Sidebar);
