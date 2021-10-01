import {View} from 'react-native';
import React from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {l, c, t} from 'styles/shared';
import styles from './styles';
import {TabItem} from './TabItem';

export function NavigationTabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? c.green300 : c.white,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            //@ts-ignore
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            isFocused={isFocused}
            index={index}
            label={label as string}
            icon={icon as JSX.Element}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );

        // return (
        //   <TouchableOpacity
        //     key={index}
        //     activeOpacity={0.7}
        //     accessibilityRole="button"
        //     accessibilityState={isFocused ? {selected: true} : {}}
        //     accessibilityLabel={options.tabBarAccessibilityLabel}
        //     testID={options.tabBarTestID}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     style={[
        //       styles.item,
        //       {
        //         backgroundColor: isFocused ? c.green300 : c.white,
        //         borderLeftWidth: index === 1 ? 1 : 0,
        //         borderRightWidth: index === 1 ? 1 : 0,
        //       },
        //     ]}>
        //     {icon}
        //     <Text
        //       style={[
        //         t.textCtr,
        //         l.ml5,
        //         {
        //           color: isFocused ? c.white : c.green300,
        //           fontFamily: t.fontFamily.Winston.Medium,
        //         },
        //       ]}>
        //       {label}
        //     </Text>
        //   </TouchableOpacity>
        // );
      })}
    </View>
  );
}
