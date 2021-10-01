import {View,} from 'react-native';
import React from 'react';

import styles from './styles';
import {SceneRendererProps} from 'react-native-tab-view';
import {TabItem} from './TabItem';

export type TabRoute = {
  key: string;
  title: string;
  icon: React.ReactNode | JSX.Element;
};

interface TabBarProps extends SceneRendererProps {
  routes: Array<TabRoute>;
  activeIndex: number;
  onPress: (index: number) => void;
}

export function TabBar({
  routes,
  activeIndex,
  position,
  jumpTo,
  onPress,
}: TabBarProps) {
  return (
    <View style={styles.container}>
      {routes.map((route, index) => {
        const _onPress = () => {
          onPress(index);
          jumpTo(route.key);
        };

        const onLongPress = () => {};

        return (
          <TabItem
            key={index}
            label={route.title}
            icon={route.icon as JSX.Element}
            isFocused={activeIndex === index}
            index={index}
            onPress={_onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
