import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import NetImage from 'components/NetImage';

type Source = {uri: string};

interface Props {
  source: Source | number;
  size: number;
  type?: 'square' | 'circle';
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  actionButton: {
    position: 'absolute',
    bottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

const MyAvatarComponent: FC<Props> = ({source, size = 100, type}) => {
  const imageStyle = useMemo(() => {
    return {
      width: size,
      height: size,
      borderRadius: type === 'square' ? 20 : size / 2,
    };
  }, [size, type]);

  const containerStyle = useMemo(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const ImageComponent =
    typeof source === 'object' && source.uri.startsWith('http')
      ? NetImage
      : Image;

  return (
    <View style={[styles.container, containerStyle]}>
      <ImageComponent
        resizeMode={'cover'}
        style={[imageStyle, {aspectRatio: 1}]}
        //@ts-ignore
        source={source}
      />
    </View>
  );
};

const MyAvatar = React.memo(MyAvatarComponent);

export default MyAvatar;

export * from './NonAvatar';
