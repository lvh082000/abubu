import {RouteProp} from '@react-navigation/native';
import NetImage from 'components/NetImage';
import DeviceHelper from 'config/DeviceHelper';
import {RootStackParams, RootScreenID} from 'navigation/types';
import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import RNGallery from 'react-native-awesome-gallery';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavigationService from 'services/NavigationService';
import {l, c} from 'styles/shared';
import DotPagination from 'components/DotPagination';
import BackButton from 'components/BackButton';

interface Props {
  route: RouteProp<RootStackParams, RootScreenID.PhotoViewer>;
}

const styles = StyleSheet.create({
  container: {
    ...l.flex,
    backgroundColor: c.black1000,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    height: 30,
    width: DeviceHelper.width,
    zIndex: 1,
  },
  dot: {
    height: 10,
    backgroundColor: c.white,
    ...l.mx5,
    borderRadius: 5,
  },
});

interface ControlsProps {
  goBack: () => void;
  images: Array<string>;
  activeIndex: number;
}

const Controls = ({goBack, images, activeIndex}: ControlsProps) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.header, {top}]}>
      <View style={[l.flexRow, l.alignCtr, l.justifyBtw, l.mx20]}>
        <BackButton goBack={goBack} />
        {images.length > 1 && (
          <DotPagination
            color={c.white}
            activeIndex={activeIndex}
            length={images.length}
            size={5}
          />
        )}
        <View style={{width: 30}} />
      </View>
    </View>
  );
};

const PhotoViewer = ({route: {params}}: Props) => {
  const initialIndex = params?.index || 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const onIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goBack = useCallback(() => {
    NavigationService.goBack();
  }, []);

  const renderItem = ({item}: {item: string}) => {
    return (
      <NetImage
        resizeMode={'contain'}
        style={{
          width: DeviceHelper.width,
          height: DeviceHelper.height,
        }}
        source={{uri: item}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Controls
        activeIndex={activeIndex}
        goBack={goBack}
        images={params.images}
      />
      <RNGallery
        onSwipeToClose={goBack}
        data={params.images}
        renderItem={renderItem}
        onIndexChange={onIndexChange}
        initialIndex={initialIndex}
      />
    </View>
  );
};

export default React.memo(PhotoViewer);
