import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import DeviceHelper from 'config/DeviceHelper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: DeviceHelper.width,
  },
  item: {
    ...l.py5,
    ...l.flexRow,
    ...l.flexCenter,
    width: DeviceHelper.width / 3,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: c.green300,
    borderRightColor: c.green300,
    borderLeftColor: c.green300,
  },
});

export function MyTabBar({
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
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.item,
              {
                backgroundColor: isFocused ? c.green300 : c.white,
                borderLeftWidth: index === 1 || index === 4 ? 1 : 0,
                borderRightWidth: index === 1 || index === 4 ? 1 : 0,
              },
            ]}>
            {icon}
            <Text
              style={[
                t.textCtr,
                l.ml5,
                {
                  color: isFocused ? c.white : c.green300,
                  fontFamily: t.fontFamily.Winston.Medium,
                  width: DeviceHelper.width / 3 - 60,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
