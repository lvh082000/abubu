import DeviceHelper from 'config/DeviceHelper';
import React, {useCallback} from 'react';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {TabBar, TabRoute} from './TabBar';

interface Props {
  renderScene: (
    props: SceneRendererProps & {
      route: TabRoute;
    },
  ) => React.ReactNode;
  routes: Array<TabRoute>;
}

export const TabContainer = React.memo(({renderScene, routes}: Props) => {
  const [index, setIndex] = React.useState(0);

  const onPress = useCallback((index: number) => {
    setIndex(index);
  }, []);

  return (
    <TabView
      swipeEnabled={false}
      //@ts-ignore
      navigationState={{index, routes}}
      //@ts-ignore
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: DeviceHelper.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          activeIndex={index}
          routes={routes}
          onPress={onPress}
        />
      )}
    />
  );
});
