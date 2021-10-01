import React from 'react';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';

interface Props {
  type?: 'square' | 'circle';
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CameraSelectedButton = React.memo(
  ({type, style, onPress}: Props) => {
    return (
      <TouchableOpacity
        style={[
          styles.selectorContainer,
          style,
          type === 'circle' ? styles.circleContainer : styles.squareContainer,
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <VectorIcon
          size={50}
          type={IconType.materialCommunity}
          name={'camera-plus-outline'}
        />
      </TouchableOpacity>
    );
  },
);
