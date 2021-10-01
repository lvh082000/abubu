import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Results} from '@baronha/react-native-multiple-image-picker';
import {c} from 'styles/shared';
import styles from './styles';
import CircleTouchable from 'components/CircleTouchable';
import VectorIcon, {IconType} from 'components/VectorIcon';
import NetImage from 'components/NetImage';

interface ImageItemProps {
  item: Results;
  index: number;
  onRemove?: () => void;
  onPress?: () => void;
}

export const SelectedImageItem = React.memo(
  ({item, onRemove, onPress}: ImageItemProps) => {
    const isNetworkImage = item.path && item.path.startsWith('http');
    return (
      <View style={styles.itemContainer}>
        {!isNetworkImage && (
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{
              uri: `file://${item.path}`,
            }}
          />
        )}
        {isNetworkImage && (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <NetImage
              resizeMode={'cover'}
              style={styles.image}
              source={{uri: item.path}}
            />
          </TouchableOpacity>
        )}
        <CircleTouchable
          onPress={onRemove}
          style={styles.removeButton}
          bg={c.red800}
          size={25}>
          <VectorIcon
            color={c.white}
            type={IconType.fontAwesome}
            name="close"
            size={14}
          />
        </CircleTouchable>
      </View>
    );
  },
);
