import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {c} from 'styles/shared';
import {SharedIconProps} from './types';

export const QuestionIcon = React.memo(
  ({color = c.white, size = 25, style, onPress}: SharedIconProps) => {
    const _onPress = () => {
      onPress?.();
    };
    return (
      <TouchableOpacity
        disabled={!onPress}
        activeOpacity={0.7}
        style={style}
        onPress={_onPress}>
        <VectorIcon
          color={color}
          size={size}
          type={IconType.fontAwesome}
          name={'question-circle'}
        />
      </TouchableOpacity>
    );
  },
);
